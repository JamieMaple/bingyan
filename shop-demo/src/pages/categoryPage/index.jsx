import React, { Component } from 'react'
import superagent from 'superagent'
import { Scrollbars } from 'react-custom-scrollbars'

import { goodsAPI, categoriesAPI, favorite, tokenName, type } from '../../api'

import Icon from '../../components/Icon/index'
import Good from '../../components/Good'
import Loader from '../../components/Loader'
import NoMore from '../../components/NoMore/index'

import AnimateTransition from '../../components/AnimateTransition'

import style from './style'

const Header = ({name, description, handleBack, show}) => (
  <div className="header"
    style={style.header}>
    <Icon type={'arrow'}
      handleClick={handleBack}
      style={{
        position: 'fixed',
        left: '15px',
        top: '20px',
        fontSize: '20px',
        zIndex: '30'
      }}
    />
    <AnimateTransition
      in={show}
      classNames="slide-right-left-short"
    >
      <h1 className="title-name"
        style={{...style.headerCategoryName, display: show ? 'block': 'none'}}>
        {name}
      </h1>
    </AnimateTransition>
    <AnimateTransition
      in={show}
      classNames="slide-right-left-short"
    >
      <p style={{...style.headerCategoryInfo, display: show ? 'block' : 'none' }}>
        {description}
      </p>
    </AnimateTransition>
  </div>
)
const Body = ({goods, favoriteGoods, handleAjaxSend, perPage, isLoading, history}) => {
  const goodsToHtml = goods.map(good => (
    <Good
      key={good._id || good.id}
      id={good._id || good.id}
      isFavorite={favoriteGoods.indexOf(good._id) > -1}
      name={good.name}
      description={good.description}
      img={good.img}
      price={good.price}
      history={history}
    />
  ))
  
  return (
    <div className="goods-wrapper"
      style={style.bodyWrapper}>
      {goodsToHtml}
    </div>
  )
}

class CategoryPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.match.params.id,
      name: '',
      description: '',
      show: false,
      page: 0,
      perPage: 20,
      requestNum: 0,
      goods: [],
      favoriteGoods: [],
      isLoading: true
    }
    
    this.handleAjaxSend = this.handleAjaxSend.bind(this)
  }

  handleScroll(e) {
    const header = document.querySelector('.header'),
      title = header.querySelector('h1'),
      headerPadding = parseInt(header.style.paddingTop, 10),
      scrollTop=e.target.scrollTop,
      totalHeight=e.target.scrollHeight,
      bodyHeight=document.body.offsetHeight

    const {isLoading, requestNum, perPage} = this.state

    title.style.top = '0'
    title.style.left = '0'
    title.style.right = '0'

    if (scrollTop >= headerPadding) {
      title.style.position = 'fixed'
      title.style.opacity = '.9'
      title.style.boxShadow = '0 2px 5px #919191'
    }else{
      title.style.position = 'static'
      title.style.opacity = '1'
      title.style.boxShadow = 'none'
    }
    // ajax
    if (totalHeight - bodyHeight <= scrollTop && requestNum >= perPage && !isLoading) {
      this.setState({isLoading: true})
      this.handleAjaxSend()
    }
  }

  handleAjaxSend() {
    const {id, page, perPage} = this.state
    superagent
      .get(goodsAPI)
      .query({category: id, page: page, perPage: perPage})
      .end((err, sres) => {
        if(err) {
          console.log(err)
        }
        
        const goods = sres.body
        const requestNum = goods.length

        this.setState({
          goods: [...this.state.goods, ...goods], 
          page: this.state.page+1,
          requestNum,
          isLoading: false
        })
      })
  }

  componentDidMount() {
    const { id } = this.state

    this.setState({show: true})

    this.handleAjaxSend()

    superagent
      .get(categoriesAPI)
      .query({category: id})
      .end((err, sres) => {
        if (err) {
          throw err
        }else{
          const {name='分类', description='暂无介绍'} = sres.body[0]
          this.setState({name, description})
        }
      })

    const token = localStorage.getItem(tokenName)

    if (token) {
      superagent
        .post(favorite)
        .send(`token=${token}`)
        .send(`type=${type.ALL}`)
        .end((err, sres) => {
          if (err) {
            throw err
          }else{
            this.setState({favoriteGoods: sres.body.favorite})
          }
        })
    }
  }


  render(){
    const { history } = this.props
    const { name, description, favoriteGoods, goods, show, perPage, isLoading, requestNum } = this.state

    let noMoreText = '没有更多了呢'

    if (goods.length === 0) {
      noMoreText = '没有搜索到哦'
    }

    return (
      <Scrollbars
        onScroll={(e) => {this.handleScroll(e)}}
        style={style.mainWrapper}>
        <Header
          name={name}
          description={description}
          show={show}
          handleBack={() => {history.push('/categories')}} />
        <Body 
          goods={goods}
          favoriteGoods={favoriteGoods}
          perPage={perPage}
          isLoading={isLoading}
          history={history}
          handleAjaxSend={this.handleAjaxSend} />
        {isLoading ? <Loader /> : null}
        {!isLoading && requestNum < perPage ? <NoMore text={noMoreText} /> : null}
      </Scrollbars>
    )
  }
}

export default CategoryPage
import React, { Component } from 'react'
import superagent from 'superagent'
import { Scrollbars } from 'react-custom-scrollbars'

import { goodsAPI, categoriesAPI } from '../../api'

import Icon from '../../components/Icon/index'
import Good from '../../components/Good'
import Loader from '../../components/Loader'

import style from './style'
import NoMore from '../../components/NoMore/index';

const Header = ({name, description, handleBack}) => (
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
    <h1 className="title-name"
      style={style.headerCategoryName}>{name}</h1>
    <p style={style.headerCategoryInfo}>{description}</p>
  </div>
)
const Body = ({goods, handleAjaxSend, perPage, isLoading, history}) => {
  const goodsToHtml = goods.map(good => (
    <Good 
      key={good._id}
      id={good._id}
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
      page: 0,
      perPage: 20,
      requestNum: 0,
      goods: [],
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

    this.handleAjaxSend()

    superagent
      .get(categoriesAPI)
      .query({category: id})
      .end((err, sres) => {
        if (err) {
          throw err
        }else{
          const {name, description} = sres.body[0]
          this.setState({name, description})
        }
      })
  }


  render(){
    const { history } = this.props
    const { name, description, goods, perPage, isLoading, requestNum } = this.state

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
          handleBack={() => {history.push('/categories')}} />
        <Body 
          goods={goods}
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
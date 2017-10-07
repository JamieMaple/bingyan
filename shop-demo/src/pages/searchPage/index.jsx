import React, { Component } from 'react'
import superagent from 'superagent'
import { Scrollbars } from 'react-custom-scrollbars'

import Header from '../../components/Header'
import Good from '../../components/Good'
import Loader from '../../components/Loader'
import NoMore from '../../components/NoMore'

import { goodsAPI } from '../../api'

const style = {}
style.wrapper = {
  height: '100vh',
  background: '#F3F3F3'
}
style.body = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: '55px',
  padding: '10px 0 0 0'
}

class SearchPage extends Component {
  constructor(props) {
    super(props)

    const { params } = this.props.match

    this.state = {
      keywords: params.keywords,
      start: 0,
      page: 0,
      perPage: 20,
      goods: [],
      requestNum: 0,
      isLoading: true
    }
  }

  handleScroll(e) {
    const scrollTop=e.target.scrollTop,
      totalHeight=e.target.scrollHeight,
      bodyHeight=document.body.offsetHeight

    const {isLoading, requestNum, perPage} = this.state

    // ajax
    if (totalHeight - bodyHeight <= scrollTop && !isLoading && requestNum >= perPage) {
      this.setState({isLoading: true})
      this.handleAjaxSend()
    }
  }

  handleAjaxSend() {
    const {keywords, goods, page, perPage} = this.state
    superagent
      .get(goodsAPI)
      .query({keywords, page, perPage})
      .end((err, sres) => {
        if (err) {
          console.log(err)
        }
      
        const res = sres.body

        this.setState({
          goods: [...goods, ...res], 
          isLoading: false,
          requestNum: res.length,
          page: page+1
        })
      })
  }

  componentDidMount() {
    this.handleAjaxSend()
  }

  render() {
    const { history } = this.props,
      { goods, keywords, isLoading, requestNum, perPage } = this.state,
      goodsToDOM = goods.map(good => (
        <Good
          key={good._id}
          id={good._id}
          name={good.name}
          description={good.description}
          price={good.price}
          img={good.img}
          history={history}
        />
      ))

    let words = keywords.split('+').join(' '),
      noMoreText = '没有更多了呢'
    
    if (goods.length === 0) {
      noMoreText = '没有搜索到哦'
    }

    return (
      <div className="search-page-wrapper"
        style={style.wrapper}>
        <Header 
          text={`有关${words}的搜索`}
          icon={'arrow'}
          handleClick={() => {history.goBack()}}
          style={{
            background: '#fff',
            zIndex: '20',
            boxShadow: '0px 1px 5px #919191'
          }} />
        <Scrollbars
          onScroll={(e)=>{this.handleScroll(e)}} >
          <div className="goods-wrapper"
            style={style.body}>
            {goodsToDOM}
            {isLoading ? <Loader /> : null}
            {!isLoading && requestNum < perPage ? <NoMore text={noMoreText} /> : null}
          </div>
        </Scrollbars>
      </div>
    )
  }
}

export default SearchPage
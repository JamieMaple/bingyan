import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Mask from '../../components/Mask'
import BackgroundImg from '../../components/BackgroundImg'
import Icon from '../../components/Icon'

import style from './style'

const img = require('./img.png')
const SearchBody = (({handleKeyWords, handleSubmit}) => (
  <div className="search-body"
    style={style.body}>
    <h1 className="title-1"
      style={style.title1}>
    发现
    </h1>
    <div className="search-input"
      style={style.searchInput}>
      <span style={style.iconStyle}><i className="ion-android-search"></i></span>
      <form
        onSubmit={(e) => {handleSubmit(e)}}
        style={style.form}>
        <input 
          type="text"
          placeholder="Find what you want"
          onChange={(e) => {handleKeyWords(e.target.value.trim())}}
          style={style.inputStyle} />
      </form>
    </div>
    <h3 className="title-2"
      style={style.title2}>
      Find something interesting
    </h3>
  </div>
))

class Search extends Component {
  constructor() {
    super()
    this.state = {keywords: []}
  }


  handleKeyWords(keywords) {
    let wordsArr = keywords.split(' ')
    this.setState({keywords: wordsArr})
  }

  handleSubmit(e) {
    e.preventDefault()
    const { keywords } = this.state
    const { history } = this.props

    if (keywords.toString() === '') {
      return
    }
    history.push(`/searched/${keywords.join('+')}`)
  }

  render() {
    return (
      <div className="search-wrapper"
        style={style.main}>
        <div className="header-wrapper"
          style={style.headerWrapper}>
          <Icon />
        </div>
        <div className="background-group"
          style={style.backgroundGroup}>
          <div className="mask-wrapper"
            style={style.backgroundItem}>
            <Mask />
          </div>
          <div className="background-wrapper"
            style={Object.assign({}, style.backgroundItem, { zIndex: '-20'})}>
            <BackgroundImg src={img} style={{height: '100%', width: '100%'}} />
          </div>
        </div>
        <SearchBody 
          handleKeyWords={this.handleKeyWords.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        />
        <div className="search-footer">
          <h3 className="footer"
            style={style.title3}>
            <Link to="/categories">查看更多分类</Link>
          </h3>
        </div>
      </div>
    )
  }
}


export default Search

import React from 'react'
import { Link } from 'react-router-dom'

import Mask from '../../components/Mask'
import BackgroundImg from '../../components/BackgroundImg'
import Icon from '../../components/Icon'

import style from './style'

const img = require('./img.png')
const SearchBody = (() => (
  <div className="search-body"
  style={style.body}>
    <h1 className="title-1"
    style={style.title1}>
    发现
    </h1>
    <div className="search-input"
    style={style.searchInput}>
      <span style={style.iconStyle}><i className="ion-android-search"></i></span>
      <input type="text"
        placeholder="Find what you want"
        style={style.inputStyle} />
    </div>
    <h3 className="title-2"
    style={style.title2}>
      {"Find something interesting"}
    </h3>
  </div>
))
const Search = (() => (
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
    <SearchBody />
    <div className="search-footer">
      <h3 className="footer"
      style={style.title3}>
        <Link to="/categories">{"查看更多分类"}</Link>
      </h3>
    </div>
  </div>
))

export default Search

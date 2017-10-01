import React from 'react'

import Mask from '../../components/Mask'
import BackgroundImg from '../../components/BackgroundImg'

const style = {}
const defaultImg = require('./default.png')

style.wrapper = {
  position: 'relative',
  height: '123px',
  width: '100%',
  marginBottom: '2px',
  color: '#fff',
  overflow: 'hidden'
}
style.commonWrapper = {
  height: '100%',
  width: '100%'
}
style.img = {
  position: 'absolute',
  left: '0',
  top: '0',
  height: '100%',
  width: '100%',
  zIndex: '-20'
}
style.title1 = {
  position: 'absolute',
  top: '36px',
  left: '0',
  right: '0',
  textAlign: 'center',
  fontSize: '28px',
  fontWeight: '200'
}
style.title2 = Object.assign({}, style.title1, {
  top: '70px',
  fontSize: '12px',
  fontWeight: '100'
})

const Category = (({title, desc, src}) => (
  <div className="category-wrapper"
    style={style.wrapper}>
    <div className="background-group"
      style={style.commonWrapper}>
      <Mask opacity={".5"} />
      <div className="img-wrapper"
        style={style.img}>
        <BackgroundImg src={src} style={{ width: '100%', left: '0', top: '-50%', transform: 'translate3d(50%)' }} />
      </div>
    </div>
    <div className="title-group">
      <h1 style={style.title1}>{title}</h1>
      <h2 style={style.title2}>{desc}</h2>
    </div>
  </div>
))
Category.defaultProps = {
  title: '分类',
  desc: '暂无介绍',
  src: defaultImg
}

export default Category

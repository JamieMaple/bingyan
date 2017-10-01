import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../../components/Icon'

const defaultImg = require('./img.png')

const style = {}
style.wrapper = {
  display: 'flex',
  alignItems: 'center',
  width: '86.8%',
  margin: '0 auto',
  padding: '20px 0',
  fontFamily: 'HelveticaNeue'
}
style.imgWrapper = {
  width: '84px'
}
style.info = {
  flex: 1,
  position: 'relative',
  height: '90px',
  paddingLeft: '24px'
}
style.name = {
  marginTop: '8px',
  lineHeight: '22px',
  fontSize: '18px',
  fontWeight: '400'
}
style.desc = {
  margin: '4px 0 15px 0',
  lineHeight: '15px',
  fontSize: '14px',
  fontWeight: '200',
  color: '#919191'
}
style.price = {
  lineHeight: '20px',
  fontSize: '16px',
  color: '#0D9F67'
}
style.iconControl = {
  position: 'absolute',
  bottom: '8px',
  right: '0'
}

class FavoriteGood extends Component {
  render() {
    const { src, name, desc,price, index } = this.props
    const _style = (index !== 0 ? { borderTop: '1px solid #C7C7C7' } : {})

    return (
      <div className="favorite-good-wrapper"
        style={Object.assign({}, style.wrapper, _style)}>
        <div className="img-wrapper"
          style={style.imgWrapper}>
          <img src={src}
            alt="food" width="84" height="88"
             />
        </div>
        <div className="info"
          style={style.info}>
          <h1 className="title"
            style={style.name}>{name}</h1>
          <p className="desc"
            style={style.desc}>{desc}</p>
          <h3 className="price"
            style={style.price}>￥{price}</h3>
          <div className="icon-control"
            style={style.iconControl}>
            <Icon type={"fullheart"} color="#EA4F4F" />
          </div>
        </div>
      </div>
    )
  }
}
FavoriteGood.defaultProps = {
  src: defaultImg,
  name: 'unknow food',
  desc: 'description',
  price: 100.00
}
FavoriteGood.PropTypes = {
  name: PropTypes.string,
  index: PropTypes.number
}

export default FavoriteGood

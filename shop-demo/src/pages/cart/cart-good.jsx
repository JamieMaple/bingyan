import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumberControl from './number-control'

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
  width: '170px',
  marginTop: '8px',
  lineHeight: '22px',
  fontSize: '18px',
  fontWeight: '400',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
}
style.price = {
  position: 'absolute',
  bottom: '7px',
  lineHeight: '20px',
  fontSize: '14px',
  color: '#0D9F67'
}
style.iconControl = {
  position: 'absolute',
  bottom: '0',
  right: '0',
  color: '#EA4F4F'
}

class CartGood extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      price: this.props.price,
      quantity: 1
    }
  }

  handleQuantity(symbol) {
    let { quantity, price, id } = this.state
    if (symbol === '+') {
      quantity = quantity + 1
      this.setState({quantity})
      this.props.handleTotalPrice(price * quantity, id)
    }else{
      if (quantity === 1) {
        let isDelted = window.confirm('是否删除出购物车')
        if(!isDelted) {
          return
        }
      }
      quantity = quantity - 1
      this.setState({quantity})
      this.props.handleTotalPrice(price * quantity, id)
    }
  }

  render() {
    const { img, name, price, index } = this.props,
      { quantity } = this.state,
      _style = (index !== 0 ? { borderTop: '1px solid #C7C7C7' } : {})

    return (
      <div className="favorite-good-wrapper"
        style={Object.assign({}, style.wrapper, _style)}>
        <div className="img-wrapper"
          style={style.imgWrapper}>
          <img src={img}
            alt="food" width="84" height="88"
          />
        </div>
        <div className="info"
          style={style.info}>
          <h1 className="title"
            style={style.name}>{name}</h1>
          <h3 className="price"
            style={style.price}>￥{price.toFixed(2)}</h3>
          <div className="num-control"
            style={style.iconControl}>
            <NumberControl
              handleQuantity={this.handleQuantity.bind(this)}
              quantity={quantity} />
          </div>
        </div>
      </div>
    )
  }
}
CartGood.defaultProps = {
  src: defaultImg,
  name: 'unknow food',
  price: 100.00
}
CartGood.propTypes = {
  name: PropTypes.string,
  index: PropTypes.number.isRequired
}

export default CartGood

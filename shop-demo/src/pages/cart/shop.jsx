import React, { Component } from 'react'

import Button from '../../components/Button'
import Icon from '../../components/Icon'

const style = {}
style.wrapper = {
  display: 'flex',
  height: '60px',
  fontSize: '16px',
  color: '#fff'
}
style.left = {
  flex: '1',
  textAlign: 'center',
  lineHeight: '60px',
  background: '#141313'
}

class Shop extends Component {
  render() {
    const { totalPrice } = this.props
    return (
      <div className="shop-wrapper"
        style={style.wrapper}>
        <div className="monney"
          style={style.left}>
          <Icon type={'cart'}
            style={{paddingRight: '5px'}} />
          总金额：￥{totalPrice.toFixed(2)}</div>
        <Button
          text={'结算'}
          disabled={totalPrice <= 0}
          handleClick={() => {alert(`一共￥${totalPrice}`)}}
          style={{
            width: '150px',
            borderRadius: '0'
          }} />
      </div>
    )
  }
}

export default Shop

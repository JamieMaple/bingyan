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
    return (
      <div className="shop-wrapper"
        style={style.wrapper}>
        <div className="monney"
          style={style.left}>
          <Icon type={'cart'} paddingRight={'5px'} />
          总金额：￥100.00</div>
        <Button text={'结算'} width={'150px'} borderRadius={'0'} />
      </div>
    )
  }
}

export default Shop

import React, { Component } from 'react'

import Header from '../../components/header'
import CartGood from './cart-good'
import Shop from './shop'

const style = {}
style.body = {
  margin: '55px 0'
}
style.footer = {
  position: 'fixed',
  left: '0',
  right: '0',
  bottom: '0',
  zIndex: '10'
}

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          id: '10000',
          name: 'name',
          price: 10.3564
        },
        {
          id: '10200',
          name: 'name',
          price: 10.3256
        },
        {
          id: '10300',
          name: 'name',
          price: 10.241412
        },
        {
          id: '10040',
          name: 'name',
          price: 10.0
        },
        {
          id: '12000',
          name: 'name',
          price: 1.0323
        },
        {
          id: '13000',
          name: 'name',
          price: 6.436
        },
        {
          id: '10345',
          name: 'name',
          price: 7.1235
        },
        {
          id: '16940',
          name: 'name',
          price: 9.0
        },
        {
          id: '10800',
          name: 'name',
          price: 4.2
        }
      ]
    }
  }
  render() {
    const items = this.state.items.map((item, index) => (
      <CartGood key={item.id}
        index={index}
        name={item.name}
        price={item.price} />
    ))
    return (
      <div className="cart-wrapper"
        style={style.header}>
        <Header text="购物车" />
        <div className="cart-body"
          style={style.body}>
          {items}
        </div>
        <div className="cart-footer"
          style={style.footer}>
          <Shop />
        </div>
      </div>
    )
  }
}

export default Cart

import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import superagent from 'superagent'

import { tokenName, cart, type } from '../../api'
import { cleanLocalStorage } from '../../utills/cleanLocalStorage'

import Header from '../../components/Header'
import CartGood from './cart-good'
import Shop from './shop'
import Loader from '../../components/Loader'
import NoMore from '../../components/NoMore'

const style = {}
style.body = {
  height: '100vh',
  margin: '55px 0 0 0'
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
      isLoading: true,
      items: [],
      totalPrice: 0
    }
  }

  handleTotalPrice(itemTotalPrice, id) {
    let totalPrice = 0

    const token = localStorage.getItem(tokenName)

    if(token) {
      const items = this.state.items.filter((item) => {
        if (item._id === id) {
          item.totalPrice = itemTotalPrice
          if(itemTotalPrice === 0) {
            superagent
              .post(cart)
              .send(`token=${token}`)
              .send(`goodid=${id}`)
              .send(`type=${type.DELETE}`)
              .end((err, sres) => {
                if(err){
                  throw err
                }
              })

            return false
          }
        }

        totalPrice += item.totalPrice

        return item
      })
      this.setState({items, totalPrice})
    }
  }

  computeTotalPrice() {
    let totalPrice = 0
    this.state.items.forEach((item) => {
      totalPrice += item.totalPrice
    })
    return totalPrice
  }

  componentDidMount() {
    const token = localStorage.getItem(tokenName)

    if (token) {
      superagent
        .post(cart)
        .send(`token=${token}`)
        .end((err, sres) => {
          if (sres && sres.status === 200) {
            const { cart } = sres.body
            let totalPrice = 0

            cart.forEach((item) => {
              totalPrice += item.price
            })

            this.setState({
              isLoading: false,
              isSignin: true,
              token: token,
              items: cart.map((item => {return{ ...item, quantity: 1, totalPrice: 1 * item.price}})),
              totalPrice
            })
          }else{
            cleanLocalStorage()
            alert('登录超时，请重新登录')
            this.props.history.push('/search')
          }
        })
    }else{
      this.props.history.push('/')
    }
  }

  render() {
    const { totalPrice, isLoading, items } = this.state,
      itemsToDom = items.map((item, index) => (
        <CartGood
          key={item._id}
          id={item._id}
          index={index}
          name={item.name}
          img={item.img}
          price={item.price}
          handleTotalPrice={this.handleTotalPrice.bind(this)} />
      ))

    return (
      <div className="cart-wrapper"
        style={{minHeight: '100vh'}}>
        <Header
          text={'购物车'}
          style={{
            boxShadow: '0px 1px 5px #919191'
          }} />
        <div className="cart-body"
          style={style.body}>
          <Scrollbars style={{height: '100vh', marginBottom: '50px'}}>
            {isLoading ? <Loader /> : null}
            {!isLoading && items.length === 0
              ? <NoMore
                text={'购物车空空如也'}
                WrapperStyle=
                  {{
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }} />
              : null}
            {itemsToDom}
          </Scrollbars>
        </div>
        <div className="cart-footer"
          style={style.footer}>
          <Shop totalPrice={totalPrice} />
        </div>
      </div>
    )
  }
}

export default Cart

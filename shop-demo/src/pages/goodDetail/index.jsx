import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import superagent from 'superagent'

import Mask from '../../components/Mask'
import Icon from '../../components/Icon'
import Button from '../../components/Button'

import { goodsAPI, tokenName } from '../../api'

import style from './style'

const ADD_TO_FAVORITE = 0,
  BUY_NOW = 1,
  ADD_TO_CART = 2

const Header = ({ name, goBack, addToFavorite }) => (
  <div className="header"
    style={style.header.header}>
    <Icon 
      type={'cross'}
      handleClick={goBack}
      style={{...style.header.icon, left: '10px'}} />
    <h1 className="name"
      style={style.header.name}>{name}</h1>
    <Icon
      type={'fullheart'}
      handleClick={() => {addToFavorite(ADD_TO_FAVORITE)}}
      style={{...style.header.icon, right: '10px'}} />
  </div>
)

class GoodDetail extends Component {
  constructor(props) {
    super(props)
    const { location } = this.props
    this.state = {
      id: location.pathname.split('/')[2],
      quantity: 1,
      ...location.state
    }
  }

  componentDidMount() {
    let { state } = this.props.location

    let { id } = this.state

    if (!state) {
      superagent
        .get(goodsAPI)
        .query({id})
        .end((err, sres) => {
          if (err) throw err

          this.setState({...sres.body[0]})
        })
    }
  }

  selectQuantity(e) {
    this.setState({quantity: e.target.value})
  }

  handleClickEntry(event) {
    const { history } = this.props

    if (!localStorage.getItem(tokenName)) {
      window.confirm('还没有登录？是否登录') && history.push('/signin')
    }
  }

  handleClickBuy() {

  }
  
  handleAddToCart() {

  }

  render() {
    const { history } = this.props,
      { name, description, img, price, quantity } = this.state,
      options = [1,2,3,4,5,6,7,8,9,10].map((value, index) => (
        <option
          key={`option-${value}`}
          value={value}
        >{value}</option>
      ))

    return (
      <div className="detail-wrapper"
        style={style.wrapper}>
        <Mask
          handleClick={() => {history.goBack()}}
          position={'fixed'}
          zIndex={'20'}
          overflow={'hidden'}
          opacity=".4" />
        <Header
          name={name}
          addToFavorite={this.handleClickEntry.bind(this)}
          goBack={() => {history.goBack()}} />
        <Scrollbars style={style.body}>
          <div className="img-group"
            style={style.imgGroup}>
            <Mask 
              position={'absolute'} 
              left={'0'} 
              top={'0'}
              zIndex={'10'}
            />
            <img
              src={img} 
              alt={`${name}-img`} 
              style={style.img} />
          </div>
          <p className="description"
            style={style.description}>{description}</p>
          <div className="price-quantity"
            style={style.priceQuantity}>
            <div className="left-box"
              style={{...style.boxCommon, borderRight: '1px solid #C1C1C1'}}>
              <h2 className="title"
                style={style.boxTitle}>数量</h2>
              <select className="option-group" 
                onChange={(e)=>{this.selectQuantity(e)}}
                style={style.quantity}>
                {options}
              </select>
            </div>
            <div className="right-box"
              style={{...style.boxCommon}}>
              <h2 className="title"
                style={style.boxTitle}>总额</h2>
              <h3 className="price"
                style={style.price}>￥{(price*quantity).toFixed(2)}</h3>
            </div>
          </div>
          <div className="button-group"
            style={style.buttonGroup}>
            <Button
              text={'立即下单'}
              handleClick={() => {this.handleClickEntry(BUY_NOW)}}
              style={{
                ...style.button
              }} />
            <Button
              text={'添加至购物车'}
              handleClick={() => {this.handleClickEntry(ADD_TO_CART)}}
              style={{
                ...style.button,
                color: '#C7C7C7',
                background: '#fff',
                border: '2px solid #C7C7C7',
                marginBottom: '30px'
              }} />
          </div>
        </Scrollbars>
      </div>
    )
  }
}

export default GoodDetail
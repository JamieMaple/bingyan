import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import superagent from 'superagent'

import Mask from '../../components/Mask'
import Icon from '../../components/Icon'
import Button from '../../components/Button'

import { goodsAPI, tokenName, favorite, cart,tokenVerify, type as sendType } from '../../api'
import cleanLocalStorage from '../../utills/cleanLocalStorage'

import style from './style'

const ADD_TO_FAVORITE = 0,
  BUY_NOW = 1,
  ADD_TO_CART = 2

const Header = ({ name, goBack, addToFavorite, isFavorite }) => (
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
      style={
        isFavorite 
          ? {...style.header.icon, right: '10px', ...style.favoriteIcon}
          : {...style.header.icon, right: '10px'}
      } />
  </div>
)

class GoodDetail extends Component {
  constructor(props) {
    super(props)
    const { location } = this.props
    this.state = {
      id: location.pathname.split('/')[2],
      quantity: 1,
      isFavorite: false,
      ...location.state
    }
  }

  componentDidMount() {
    let { state } = this.props.location,
      { id } = this.state

    if (!state.img && !state.name && !state.description) {
      superagent
        .get(goodsAPI)
        .query({id})
        .end((err, sres) => {
          if (err) throw err

          this.setState({...sres.body[0]})
        })
    }

    // check for favorite
    const token = localStorage.getItem(tokenName)
    if (token) {
      superagent
        .post(favorite)
        .send(`token=${token}`)
        .send(`type=${sendType.ALL}`)
        .end((err, sres) => {
          if (err){
            throw err            
          }else{
            const { favorite } = sres.body

            if(favorite.indexOf(id) > -1) {
              this.setState({isFavorite: true})
            }
          }
        })
    }
  }

  selectQuantity(e) {
    this.setState({quantity: e.target.value})
  }

  handleClickEntry(eventType) {
    const { history } = this.props,
      token = localStorage.getItem(tokenName)

    if(token){
      superagent
        .post(tokenVerify)
        .send(`token=${token}`)
        .end((err, sres) => {
          if(sres.status !== 200) {
            cleanLocalStorage()
            window.confirm('登录失效，是否重新登录') && history.push('/signin')      
          }else{
            switch (eventType){
            case ADD_TO_FAVORITE: 
              this.handleAddToFavorite(token)
              break
            case BUY_NOW:
              this.handleClickBuy()
              break
            case ADD_TO_CART:
              this.handleAddToCart(token)
              break
            default:
              break
            }
          }
        })
    }else{
      window.confirm('还没有登录，是否登录') && history.push('/signin')
    }
  }

  handleAddToFavorite(token) {
    const { isFavorite, id } = this.state,
      type = isFavorite ? sendType.DELETE : sendType.ADD

    superagent
      .post(favorite)
      .send(`token=${token}`)
      .send(`type=${type}`)
      .send(`goodid=${id}`)
      .end((err, sres) => {
        this.setState({isFavorite: !isFavorite})
      })
  }

  handleClickBuy() {
    const { price, quantity } = this.state
    alert(`一共￥${(price * quantity).toFixed(2)}`)
  }
  
  handleAddToCart(token) {
    const goodid = this.state.id
    superagent
      .post(cart)
      .send(`token=${token}`)
      .send(`type=${sendType.ADD_TO_CART}`)
      .send(`goodid=${goodid}`)
      .end((err, sres) => {
        if(err) {
          throw err
        }else{
          alert('添加成功')
        }
      })
  }

  render() {
    const { history } = this.props,
      {previousPath = '/search'} = this.props.location.state,
      { name, description, img, price, quantity, isFavorite } = this.state,
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
          handleClick={() => {history.push(previousPath)}}
          position={'fixed'}
          zIndex={'20'}
          overflow={'hidden'}
          opacity=".4" />
        <Header
          name={name}
          isFavorite={isFavorite}
          addToFavorite={this.handleClickEntry.bind(this)}
          goBack={() => {history.push(previousPath)}} />
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
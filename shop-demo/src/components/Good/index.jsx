import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import superagent from 'superagent'

import Icon from '../Icon'

import { tokenName, favorite, type as sendType } from '../../api'
import cleanLocalStorage from '../../utills/cleanLocalStorage'

const style = {} 
style.goodWrapper = {
  position: 'relative',
  width: '170px',
  height: '225px',
  margin: '5px 5px',
  padding: '14px',
  background: '#fff',
  boxShadow: '-5px 5px 30px #F3F3F3',
  borderRadius: '5px'
}
style.name = {
  fontSize: '16px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#666666'
}
style.desc = {
  margin: '6px 0 3px',
  fontSize: '12px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#919191'
}
style.price = {
  position: 'absolute',
  left: '14px',
  bottom: '20px',
  marginTop: '15px',
  fontSize: '14px',
  color: '#0D9F67'
}
style.defaultIcon = {
  position: 'absolute',
  bottom: '20px',
  right: '14px',
  zIndex: '10',
  color: '#C7C7C7'
}
style.favoriteIcon = {
  color: '#EA4F4F'
}

class Good extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFavorite: this.props.isFavorite
    }
  }

  handleAddToFavorite() {
    const { history, id } = this.props,
      token = localStorage.getItem(tokenName)

    let type = this.state.isFavorite ? sendType.DELETE : sendType.ADD
    
    if(token){
      superagent
        .post(favorite)
        .send(`token=${token}`)
        .send(`type=${type}`)
        .send(`goodid=${id}`)
        .end((err, sres) => {
          if(sres.status !== 200) {
            cleanLocalStorage()
            window.confirm('登录失效，是否重新登录') && history.push('/signin')      
          }else{
            this.setState({isFavorite: !this.state.isFavorite})
          }
        })
    }else{
      window.confirm('还没有登录，是否登录') && history.push('/signin')
    }
  }

  render() {
    const { id, name, description, img, price, history } = this.props,
      { isFavorite } = this.state

    return (
      <div
        className="good-wrapper"
        style={style.goodWrapper}
      >
        <h1 className="good-name"
          style={style.name}>{name}</h1>
        <p className="good-desc"
          style={style.desc}>{description}</p>
        <img src={img} width="130" height="130" alt={name}/>
        <span
          style={style.price}>￥{price.toFixed(2)}</span>
        <Icon 
          type={'fullheart'}
          handleClick={() => {this.handleAddToFavorite()}}
          style={isFavorite ? {...style.defaultIcon, ...style.favoriteIcon} : style.defaultIcon} />
        <Link 
          to={{
            pathname:`/good/${id}`,
            state: {id, name, description, img, price, previousPath: history.location.pathname}
          }}
          style={{
            display: 'block',
            position: 'absolute',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            zIndex: '5'
          }}/>
      </div>
    )
  }
}

Good.proptypes = {
  id: PropTypes.string, 
  name: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string, 
  price: PropTypes.string,
  isFavorite: PropTypes.bool
}
Good.defaultProps = {
  id: '',
  name: '',
  description: '',
  img: '',
  price: 30,
  isFavorite: false
}

export default Good
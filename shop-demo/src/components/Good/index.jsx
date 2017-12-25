import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import superagent from 'superagent'

import { tokenName, favorite, type as sendType } from '../../api'
import cleanLocalStorage from '../../utills/cleanLocalStorage'

import Icon from '../Icon'
import BackgroundImg from '../BackgroundImg/index'

import AnimateTransition from '../../components/AnimateTransition'

import style from './style'

class Good extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      isFavorite: this.props.isFavorite
    }
  }

  componentDidMount() {
    this.setState({show: true})
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
      { show, isFavorite } = this.state

    return (
      <AnimateTransition
        in={show}
        classNames="slide-bottom-top-short"
      >
        <div
          className="good-wrapper"
          style={style.goodWrapper}
        >
          <h1 className="good-name"
            style={style.name}>{name}</h1>
          <p className="good-desc"
            style={style.desc}>{description}</p>
          <BackgroundImg
            img={img}
            style={{
              position: 'static',
              width: 130,
              height: 130
            }}
          />
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
      </AnimateTransition>
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
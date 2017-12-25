import React, { Component } from 'react'
import PropTypes from 'prop-types'
import superagent from 'superagent'

import { tokenName, favorite, type } from '../../api'
import { cleanLocalStorage } from '../../utills/cleanLocalStorage'

import Header from '../../components/Header'
import FavoriteGood from './favorite-good'
import Loader from '../../components/Loader'
import NoMore from '../../components/NoMore'

const style = {}
style.body = {
  position: 'absolute',
  top: '55px',
  left: '0',
  right: '0',
  overflow: 'hidden'
}

class Favorite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      favorite: [],
      isLoading: true,
      isSignIn: false,
      token: ''
    }
  }

  componentDidMount() {
    const token = localStorage.getItem(tokenName)
    this.setState({show: true})

    if (token) {
      superagent
        .post(favorite)
        .send(`token=${token}`)
        .end((err, sres) => {
          if (sres && sres.status === 200) {
            const favorite = sres.body.favorite.map(item => ({...item, show: false}))

            favorite.forEach((item1, index1) => {
              setTimeout(() => {
                this.setState({favorite: this.state.favorite.map(
                  (item2, index2) => (index1 >= index2 ? {...item2, show: true} : item2)
                )})
              }, 100 * index1)
            })

            this.setState({
              isLoading: false,
              isSignin: true,
              token,
              favorite: favorite
            })
          }else{
            cleanLocalStorage()
            alert('登录超时，请重新登录')
            this.props.history.push('/signin')
          }
        })
    }else{
      this.props.history.push('/')
    }


  }

  removeFavorite(id) {
    const deleled = window.confirm('你确定要删除么')

    if(!deleled) {
      return
    }

    const token = localStorage.getItem(tokenName)

    if (token) {
      superagent
        .post(favorite)
        .send(`token=${token}`)
        .send(`goodid=${id}`)
        .send(`type=${type.DELETE}`)
        .end((err, sres) => {
          if (sres.status === 200) {
            const favorite = this.state.favorite.filter(favoriteGood => {
              return favoriteGood._id !== id
            })
            this.setState({
              favorite
            })
          }else{
            cleanLocalStorage()
            alert('登录超时，请重新登录')
            this.props.history.push('/signin')
          }
        })
    }
  }

  render() {
    const { show, isLoading, favorite } = this.state,
      goods = favorite.map((good, index) => (
        <FavoriteGood
          key={good._id}
          show={good.show}
          id={good._id}
          index={index}
          name={good.name}
          desc={good.description}
          img={good.img}
          location={this.props.location}
          removeFavorite={this.removeFavorite.bind(this, good._id)}
          price={(good.price).toFixed(2)}/>
      ))

    return (
      <div  className="favorite-wrapper">
        <Header
          text={'收藏夹'}
          show={show}
          style={{
            boxShadow: '0px 1px 5px #919191'
          }} />
        <div className="favorite-body"
          style={style.body}>
          {goods}
          {isLoading ? <Loader /> : null}
          {!isLoading && favorite.length === 0
            ? <NoMore
              text={'收藏夹空空如也'}
              WrapperStyle=
                {{
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }} />
            : null}
        </div>
      </div>
    )
  }
}
Favorite.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
  price: PropTypes.number
}

export default Favorite

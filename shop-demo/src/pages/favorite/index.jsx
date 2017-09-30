import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/header'
import FavoriteGood from './favorite-good'

const style = {}
style.body = {
  position: 'absolute',
  top: '55px',
  left: '0',
  right: '0'
}

class Favorite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items:
      [
        {
          id: '12024',
          name: 'food1',
          desc: 'description',
          price: 6.12412
        },
        {
          id: '12324',
          name: 'food2',
          desc: 'description',
          price: 9.0
        },
        {
          id: '12345',
          name: 'food3',
          desc: 'description',
          price: 7.387324
        },
        {
          id: '22675',
          name: 'food4',
          desc: 'description',
          price: 6.333
        },
        {
          id: '23625',
          name: 'food5',
          desc: 'description',
          price: 2.999
        },
        {
          id: '29634',
          name: 'food6',
          desc: 'description',
          price: 9.1
        },
        {
          id: '22024',
          name: 'food1',
          desc: 'description',
          price: 6.12412
        },
        {
          id: '22324',
          name: 'food2',
          desc: 'description',
          price: 9.0
        },
        {
          id: '22345',
          name: 'food3',
          desc: 'description',
          price: 7.387324
        },
        {
          id: '22679',
          name: 'food4',
          desc: 'description',
          price: 6.333
        },
        {
          id: '23624',
          name: 'food5',
          desc: 'description',
          price: 2.999
        },
        {
          id: '29835',
          name: 'food6',
          desc: 'description',
          price: 9.1
        }
      ]
    }
  }
  render() {
    const items = this.state.items.map((item, index) => (
      <FavoriteGood
        key={item.id}
        index={index}
        name={item.name}
        desc={item.desc}
        price={(item.price).toFixed(2)}/>
    ))
    return (
      <div  className="favorite-wrapper">
        <Header text="收藏夹" />
        <div className="favorite-body"
          style={style.body}>
          {items}
        </div>
      </div>
    )
  }
}
Favorite.propTypes ={
  name: PropTypes.string,
  desc: PropTypes.string,
  price: PropTypes.number
}

export default Favorite

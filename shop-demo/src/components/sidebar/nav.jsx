import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import Icon from '../../components/Icon'

import style from './style'

class Navigator extends Component {
  constructor(props) {
    super(props)
    this.toggleShow = this.toggleShow.bind(this)
  }
  
  toggleShow() {
    this.props.toggleShow()
  }

  render() {
    const FAVORITE = 2,
      CART = 3
    
    let navItems = [
      {
        name: '发现',
        path: '/search',
        type: 'search'
      },
      {
        name: '分类',
        path: '/categories',
        type: 'categories'
      },
      {
        name: '收藏夹',
        path: '/favorite',
        type: 'favorite'
      },
      {
        name: '购物车',
        path: '/cart',
        type: 'cart'
      }
    ]

    if (!this.props.isSignin) {
      navItems[FAVORITE].path = '/signin'
      navItems[CART].path = '/signin'
    }

    const navItemsToDOM = navItems.map((item, index) => (
      <li className="nav-item"
        key={`item-${index}`}
        style={style.navItem}>
        <NavLink
          to={item.path}
          activeClassName="active"
          style={style.itemName}
          onClick={(e) => {
            if(item.path === '/signin') {
              let goSignin = window.confirm('还没有登录，是否登录')
              if (!goSignin) {
                e.preventDefault()
                return
              }
            }
            this.toggleShow()
          }}
          activeStyle={Object.assign({}, style.itemName, style.itemNameActive)}>
          <Icon
            type={item.type}
            style={{marginRight: '5px'}} />{item.name}
        </NavLink>
      </li>
    ))
    return (
      <ul className="nav-container">
        {navItemsToDOM}
      </ul>
    )
  }
}

export default Navigator

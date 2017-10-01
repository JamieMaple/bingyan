import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import Icon from '../../components/Icon'

import style from './style'

class Navigator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navItems: [
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
    }

    this.toggleShow = this.toggleShow.bind(this)
  }
  toggleShow() {
    this.props.toggleShow()
  }
  render() {
    const navItems = this.state.navItems.map((item, index) => (
      <li className="nav-item"
      key={`item-${index}`}
      style={style.navItem}>
        <NavLink
          to={item.path}
          activeClassName="active"
          style={style.itemName}
          onClick={this.toggleShow}
          activeStyle={Object.assign({}, style.itemName, style.itemNameActive)}>
          <Icon type={item.type} marginRight={"5px"} />{item.name}
        </NavLink>
      </li>
    ))
    return (
      <ul className="nav-container"
        style={{margin: 0}}>
        {navItems}
      </ul>
    )
  }
}

export default Navigator

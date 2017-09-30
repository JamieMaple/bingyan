import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SideBarControl from '../../components/sidebar'

import Search from '../search'
import Categories from '../categories'
import Favorite from '../favorite'
import Cart from '../cart'

const style = {}
style.header = {
  position: 'absolute',
  left: '10px',
  top: '18px'
}

const MainPage = (() => (
  <div className="page-wrapper">
    <div className="page-header"
    style={style.header}>
      <SideBarControl />
    </div>
    <div className="page-body">
      <Switch>
        <Route path="/search" component={Search} />
        <Route path="/categories" component={Categories} />
        <Route path="/favorite" component={Favorite} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </div>
  </div>
))

export default MainPage

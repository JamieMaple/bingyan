import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SideBarControl from '../../components/Sidebar'

import NotFound from '../404'
import Search from '../search'
import Categories from '../categories'
import CategoryPage from '../categoryPage/index'
import Favorite from '../favorite'
import Cart from '../cart'


const style = {}
style.header = {
  position: 'absolute',
  left: '15px',
  top: '18px'
}

const MainPage = ({match}) => {
  const mainPath = ['/search', '/categories', '/favorite', '/cart']
  let header = null
  if(mainPath.indexOf(match.url) > -1) {
    header = (
      <div className="page-header"
        style={style.header}>
        <SideBarControl />
      </div>
    )
  }
  return (
    <div className="page-wrapper">
      {header}
      <div className="page-body">
        <Switch>
          <Route path="/search" component={Search} />
          <Route exact path="/categories" component={Categories} />
          <Route path="/category/:id" component={CategoryPage} />
          <Route path="/favorite" component={Favorite} />
          <Route path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  )
}

export default MainPage

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import SideBarControl from '../../components/Sidebar'

import NotFound from '../404'
import Search from '../search'
import Categories from '../categories'
import CategoryPage from '../categoryPage/index'
import GoodDetail from '../goodDetail'
import Favorite from '../favorite'
import Cart from '../cart'

const style = {}
style.header = {
  position: 'absolute',
  left: '15px',
  top: '18px'
}

class MainPage extends Component {
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    if (
      nextProps.history.action !== 'POP' &&
      nextProps.match.url === '/good'
    ) {
      this.previousLocation = this.props.location
    }
  }

  render () {
    const { location, match } = this.props,
      mainPath = ['/search', '/categories', '/favorite', '/cart']
    let header = null,
      isGoodDetail = match.url === '/good'
  
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
          <Switch location={isGoodDetail ? this.previousLocation : location}>
            <Route path="/search" component={Search} />
            <Route exact path="/categories" component={Categories} />
            <Route path="/category/:id" component={CategoryPage} />
            <Route path="/favorite" component={Favorite} />
            <Route path="/cart" component={Cart} />
            <Route component={NotFound} />
          </Switch>
          {isGoodDetail ? <Route path="/good/:id" component={GoodDetail} /> : null}
        </div>
      </div>
    )
  }
}

export default MainPage

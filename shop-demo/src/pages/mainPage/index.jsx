import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import SideBarControl from '../../components/Sidebar'

import Search from '../search'
import SearchPage from '../searchPage'
import Categories from '../categories'
import CategoryPage from '../categoryPage/index'
import GoodDetail from '../goodDetail'
import Favorite from '../favorite'
import Cart from '../cart'
import UserInfo from '../userInfo'

const style = {}
style.header = {
  position: 'absolute',
  left: '15px',
  top: '15px',
  padding: '5px'
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
    const { location, match, history } = this.props,
      mainPath = [
        '/search', 
        '/categories',
        '/favorite',
        '/cart'
      ]
    let header = null,
      isGoodDetail = match.url === '/good'
  
    if(mainPath.indexOf(match.url) > -1) {
      header = (
        <div className="page-header"
          style={style.header}>
          <SideBarControl history={history} />
        </div>
      )
    }
  
    return (
      <div className="page-wrapper" style={{position: 'relative'}}>
        {header}
        <div className="page-body">
          <Switch location={isGoodDetail ? this.previousLocation : location}>
            <Route exact path="/search" component={Search} />
            <Route path="/searched/:keywords" component={SearchPage} />
            <Route exact path="/categories" component={Categories} />
            <Route path="/category/:id" component={CategoryPage} />
            <Route path="/favorite" component={Favorite} />
            <Route path="/cart" component={Cart} />
            <Route path="/userinfo" component={UserInfo} />
          </Switch>
          {isGoodDetail ? <Route path="/good/:id" component={GoodDetail} /> : null}
        </div>
      </div>
    )
  }
}

export default MainPage

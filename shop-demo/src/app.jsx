import React from 'react'
import { Route, Switch } from 'react-router-dom'

import IndexPage from './pages/index'
import MainPage from './pages/mainPage'
import NotFound from './pages/404'
import SignIn from './pages/signin'
import SignUp from './pages/signup'

const App = (() => {
  return (
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/search" component={MainPage} />
        <Route path="/categories" component={MainPage} />
        <Route path="/favorite" component={MainPage} />
        <Route path="/cart" component={MainPage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
  )
})

export default App

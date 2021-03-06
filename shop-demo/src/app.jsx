import React from 'react'
import { Route, Switch } from 'react-router-dom'

import IndexPage from './pages/index'
import MainPage from './pages/mainPage'
import SignIn from './pages/signin'
import SignUp from './pages/signup'

const style = {}
style.routeWrapper = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0
}

const App = () => (
  <Switch>
    <Route exact path='/' component={IndexPage} />
    <Route exact path='/signin' component={SignIn} />
    <Route exact path='/signup' component={SignUp} />
    <Route path='/:others' component={MainPage} />
  </Switch>
)

export default App

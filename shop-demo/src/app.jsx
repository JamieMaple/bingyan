import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'

import IndexPage from './pages/index'
import MainPage from './pages/mainPage'
import SignIn from './pages/signin'
import SignUp from './pages/signup'

import AnimateTransition from './components/AnimateTransition'

const style = {}
style.routeWrapper = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0
}

const App = () => (
  <Route render={({location}) => (
    <TransitionGroup>
      <AnimateTransition
        key={location.pathname}
        classNames="page-fade"
        timeout={300}
      >
        <div
          className="route-wrapper" 
          style={style.routeWrapper}
        >
          <Switch>
            <Route exact path='/' component={IndexPage} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route path='/:others' component={MainPage} />
          </Switch>
        </div>
      </AnimateTransition>
    </TransitionGroup>
  )} />
)

export default App

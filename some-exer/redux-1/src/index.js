import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { reducer } from './reducers'

import ButtonGroup from './containers/ButtonGroup'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <ButtonGroup />
  </Provider>,
  document.getElementById('root')
)
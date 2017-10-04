import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ThemeSwitch extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  constructor () {
    super()
    this.state = { themeColor: '' }
  }

  componentWillMount() {
    const { store } = this.context
    this._updateThemeColor()
    store.subscribe(() => this._updateThemeColor())
  }

  _updateThemeColor() {
    const { store } = this.context
    const state = store.getState()
    this.setState({themeColor: state.themeColor})
  }

  handleClick(color) {
    const { store } = this.context
    store.dispatch({
      type: 'CHANGE_COLOR',
      color: color
    })
  }

  render () {
    return (
      <div>
        <button 
          onClick={() => this.handleClick('red')}
          style={{color: this.state.themeColor}}>Red</button>
        <button 
          onClick={() => this.handleClick('blue')}
          style={{color: this.state.themeColor}}>Blue</button>
      </div>
    )
  }
}

export default ThemeSwitch
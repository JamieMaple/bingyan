import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const color = {
  green: '#0D9F67',
  red: '#EA4F4F',
  blue: '#3B5998',
}
const _style = {}
_style.button = {
  display: 'block',
  position: 'relative',
  height: '100%',
  width: '100%',
  padding: 0,
  margin: 0,
  border: 0,
  borderRadius: '3px',
  outline: 'none',
  fontSize: '15px',
  background: color.green,
  color: '#fff'
}
_style.link = {
  display: 'inline-block',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  height: '100%'
}

class Button extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log('click happened')
  }

  render() {
    let { text, path, style } = this.props
    let link = null

    if (path !== '') {
      link = <Link to={path} style={_style.link}></Link>
    }

    switch (style.background) {
    case 'red':
      style.background = color.red
      break
    case 'blue':
      style.background = color.blue
      break
    case 'green':
      style.background = color.green
      break
    default:
      break
    }

    return (
      <button
        type="button"
        style={{..._style.button, ...style}}
        onClick={this.handleClick}>
        {link}
        {text}
      </button>
    )
  }
}
Button.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object
}
Button.defaultProps = {
  text: '按钮',
  style: {
    background: color.green
  },
  path: ''
}

export default Button

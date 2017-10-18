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
  color: '#fff',
  transition: 'background .3s ease-in-out'
}
_style.link = {
  display: 'inline-block',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  height: '100%'
}
_style.disabled = {
  background: '#919191'
}

class Button extends Component {
  render() {
    let { text, path, style, disabled, handleClick, type } = this.props
    let link = null

    if (path !== '') {
      link = <Link to={path} style={_style.link}></Link>
    }

    if(disabled) {
      style = {...style, ..._style.disabled}
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
        type={type}
        disabled={disabled}
        style={{..._style.button, ...style}}
        onClick={handleClick}>
        {link}
        {text}
      </button>
    )
  }
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  type: 'button',
  text: '按钮',
  disabled: false,
  handleClick: function() {},
  style: {
    background: color.green
  },
  path: ''
}

export default Button

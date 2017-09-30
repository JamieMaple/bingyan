import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const color = {
  green: '#0D9F67',
  red: '#EA4F4F',
  blue: '#3B5998',
}
const style = {}
style.button = {
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
style.link = {
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
    let { text, path, ..._style } = this.props

    switch (_style.background) {
      case 'red':
        _style.background = color.red
        break
      case 'blue':
        _style.background = color.blue
        break
      default:
        _style.background = color.green
        break
    }
    return (
        <button
          type="button"
          style={Object.assign({}, style.button, _style)}
          onClick={this.handleClick}>
          <Link to={path} style={style.link} ></Link>
          {text}
        </button>
    )
  }
}
Button.propTypes = {
  text: PropTypes.string,
  background: PropTypes.string
}
Button.defaultProps = {
  text: '按钮',
  background: 'default',
  path: '#'
}

export default Button

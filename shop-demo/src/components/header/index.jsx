import React from 'react'

import Icon from '../icon'
const _style = {}
_style.header = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: '10',
  color: '#666',
  background: '#fff',
  paddingTop: '10px',
  fontSize: '20px',
  lineHeight: '40px'
}
_style.title = {
  textAlign: 'center',
  fontWeight: '200'
}
_style.icon = {
  display: 'inline-block',
  position: 'absolute',
  bottom: '0',
  left: '15px',
  fontSize: '22px',
  fontWeight: '200'
}

const Header = (({text, icon}) => {
  let title = null
  if(text) {
    title = <h1 className="title" style={_style.title}>{text}</h1>
  }
  return (
    <div className="header"
      style={_style.header}>
      {title}
      <span style={_style.icon}>
        <Icon type={icon} />
      </span>
    </div>
  )
})
Header.defaultProps = {
  text: '',
  icon: 'nav'
}

export default Header

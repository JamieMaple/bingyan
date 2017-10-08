import React from 'react'

import Icon from '../Icon'
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
  maxWidth: '80%',
  margin: '0 auto',
  textAlign: 'center',
  fontWeight: '200',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}
_style.icon = {
  display: 'inline-block',
  position: 'absolute',
  bottom: '0',
  left: '15px',
  fontSize: '22px',
  fontWeight: '200'
}

const Header = ({text, icon, handleClick, style}) => {
  let title = null
  if(text) {
    title = <h1 className="title" style={_style.title}>{text}</h1>
  }
  return (
    <div className="header"
      style={Object.assign({}, _style.header, style)}>
      {title}
      <span style={_style.icon}>
        <Icon type={icon} handleClick={handleClick} />
      </span>
    </div>
  )
}
Header.defaultProps = {
  text: '',
  icon: 'nav'
}

export default Header

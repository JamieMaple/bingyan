import React from 'react'

import Icon from '../Icon'
const style = {}
style.header = {
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
style.title = {
  textAlign: 'center',
  fontWeight: '200'
}
style.icon = {
  display: 'inline-block',
  position: 'absolute',
  bottom: '0',
  left: '15px',
  fontSize: '22px',
  fontWeight: '200'
}

const Header = ({text, icon, handleClick, ..._style}) => {
  let title = null
  if(text) {
    title = <h1 className="title" style={style.title}>{text}</h1>
  }
  return (
    <div className="header"
      style={Object.assign({}, style.header, _style)}>
      {title}
      <span style={style.icon}>
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

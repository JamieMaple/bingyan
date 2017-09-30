import React from 'react'

const style = {}
const chooseSize = {
  large: {
    width: '114px',
    height: '114px',
    fontSize: '16px',
  },
  medium: {
    width: '90px',
    height: '90px',
    fontSize: '12px',
  }
}
style.container = {
  margin: 'auto',
  border: '2px solid #fff',
  fontSize: '16px'
}
style.titleGroup = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
}
style.title = {
  textAlign: 'center',
  marginBottom: '15px',
  fontWeight: '300',
  color: 'inherit'
}

const Title = (({ color }) => (
    <hgroup className="title-group"
      style={Object.assign({}, style.titleGroup, {color})}>
      <h1 style={style.title}>LITTLE</h1>
      <h1 style={style.title}>T H</h1>
      <h1 style={Object.assign({}, style.title, { marginBottom: '0' })}>SHOP</h1>
    </hgroup>
  ))
const Logo = (({ color, size }) => (
  <div className="Logo"
    style={Object.assign({}, style.container, {borderColor: color}, chooseSize[size])}>
    <Title color={color} />
  </div>
))
Logo.defaultProps = {
  color: '#fff',
  size: 'large'
}


export default Logo

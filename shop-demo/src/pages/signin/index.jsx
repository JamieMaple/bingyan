import React from 'react'

import Header from '../../components/Header'
import Logo from '../../components/Logo'
import Button from '../../components/Button/'

const style = {}
style.body = {
  marginTop: '55px'
}
style.logoWrapper = {
  padding: '80px 0 66px 0'
}
style.inputGroup = {
  width: '325px',
  margin: 'auto'
}
style.input = {
  display: 'block',
  boxSizing: 'border-box',
  width: '100%',
  marginBottom: '10px',
  padding: '12px 16px',
  border: '1px solid #0D9F67',
  borderRadius: '3px',
  color: '#0D9F67'
}

const SignIn = (() => (
  <div className="sign-in-wrapper">
    <Header
      text={'登录'}
      icon={'cross'}
      handleClick={() => {}}
    />
    <div className="body"
      style={style.body}>
      <div className="logo-wrapper"
        style={style.logoWrapper}>
        <Logo color={'gray'} />
      </div>
      <div className="input-group"
        style={style.inputGroup}>
        <input type="text" style={style.input} placeholder={'用户名'} />
        <input type="password" style={style.input} placeholder={'密码'} />
        <Button text={'登录'} padding={'14px 0'} />
      </div>
    </div>
  </div>
))

export default SignIn

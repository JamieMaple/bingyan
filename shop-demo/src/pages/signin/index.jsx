import React from 'react'

import Header from '../../components/header'
import Logo from '../../components/logo'

const style = {}
style.body = {
  marginTop: '55px'
}
style.logoWrapper = {
  padding: '80px 0 66px 0'
}

const SignIn = (() => (
  <div className="sign-in-wrapper">
    <Header text={"登录"} icon={"cross"} />
    <div className="body"
      style={style.body}>
      <div className="logo-wrapper"
        style={style.logoWrapper}>
        <Logo color={"gray"} />
      </div>
    </div>
  </div>
))

export default SignIn

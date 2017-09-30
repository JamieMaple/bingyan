import React from 'react'

import Logo from '../../components/logo'
import Header from '../../components/header'

const SignUp = (() => (
  <div className="sign-up-wrapper">
    <Header text={"登录"} icon={"arrow"} />
    <div className="body">
      <div className="logo-wrapper">
        <Logo />
      </div>
    </div>
  </div>
))

export default SignUp

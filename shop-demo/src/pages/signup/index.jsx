import React, { Component } from 'react'

import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'

const style = {}
style.body = {
  marginTop: '55px',
}
style.logoWrapper = {
  padding: '15px 0 20px 0'
}
style.formWrapper = {
  width: '325px',
  margin: 'auto'
}
style.inputsWrapper = {
  padding: '15px 0',
  marginBottom: '3px',
  borderBottom: '1px solid #c7c7c7'
}
style.input = {
  display: 'block',
  width: '100%',
  fontSize: '16px'
}

const Input = (({type, placeholder}) => (
  <div className="inputs-wrapper"
    style={style.inputsWrapper}>
    <input type={type} style={style.input} placeholder={placeholder} />
  </div>
))

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          placeholder: '昵称',
          type: 'text'
        },
        {
          placeholder: '邮箱',
          type: 'text'
        },
        {
          placeholder: '用户名',
          type: 'text'
        },
        {
          placeholder: '输入密码',
          type: 'password'
        },
        {
          placeholder: '确认密码',
          type: 'password'
        }
      ]
    }
  }
  render() {
    const items = this.state.items.map((item, index) => (
      <Input key={`input-${index}`}
        type={item.type}
        placeholder={item.placeholder} />
    ))

    return (
      <div className="sign-up-wrapper">
        <Header text={"注册"} icon={"arrow"} />
        <div className="body"
          style={style.body}>
          <div className="logo-wrapper"
            style={style.logoWrapper}>
            <Logo color={"gray"} />
          </div>
          <div className="form-wrapper"
            style={style.formWrapper}>
            {items}
            <Button text={"注册"} padding={"14px 0"} marginTop={"15px"} />
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp

import React, { Component } from 'react'
import superagent from 'superagent'

import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'

import { signUp } from '../../api'

const style = {}
style.body = {
  marginTop: '55px',
}
style.logoWrapper = {
  padding: '15px 0 20px 0'
}
style.formWrapper = {
  width: '90%',
  maxWidth: '325px',
  margin: 'auto'
}
style.inputsWrapper = {
  display: 'flex',
  padding: '15px 0',
  marginBottom: '3px',
  borderBottom: '1px solid #c7c7c7'
}
style.input = {
  display: 'inline-block',
  flex: '1',
  textAlign: 'right',
  fontSize: '16px',
  fontWeight: 'lighter',
  color: '#0D9F67'
}
style.text = {
  width: '75px',
  color: '#919191'
}

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password1: '',
      password2: '',
      isSubmit: false
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({isSubmit: true})

    const { email, username, password1, password2 } = this.state,
      { history } = this.props,
      emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      usernameReg = /^[a-zA-Z0-9_-]{5,12}$/,
      passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    
    let noPassNum = 0,
      password = password1

    if (!emailReg.test(email)) {
      alert('email 不正确')
      noPassNum++
    }

    if (!usernameReg.test(username)) {
      alert('用户名必须是5到12位的字母、数字或者_')
      noPassNum++
    }
    
    if (password1 !== password2) {
      alert('两次密码不匹配')
      noPassNum++
    }else if(!passwordReg.test(password)){
      alert('密码必须是6到20位的同时包含字母和数字')
      noPassNum++
    }

    if (noPassNum > 0) {
      this.setState({isSubmit: false})
      return
    }

    superagent
      .post(signUp)
      .send(`email=${email}`)
      .send(`username=${username}`)
      .send(`password=${password1}`)
      .send(`password=${password2}`)
      .end((err, sres) => {
        if (err) {
          this.setState({isSubmit: false})
          throw err
        }
        if (sres.status >= 400) {
          alert('未知错误')
          this.setState({isSubmit: false})
        }

        if (sres.status === 200) {
          history.push('/search')
        }

      })
  }

  render() {
    const { history } = this.props,
      {email, username, password1, password2, isSubmit} = this.state,
      items = [
        {
          field: 'email',
          text: '邮箱',
          type: 'text'
        },
        {
          field: 'username',
          text: '用户名',
          type: 'text'
        },
        {
          field: 'password1',
          text: '输入密码',
          type: 'password'
        },
        {
          field: 'password2',
          text: '确认密码',
          type: 'password'
        }
      ],
      itemsToDom = items.map((item, index) => (
        <div 
          key={`input-${index}`}
          className="inputs-wrapper"
          style={style.inputsWrapper}>
          <label style={style.text}>{item.text}</label>
          <input
            type={item.type}
            onChange={(e) => {this.setState({[item.field]:e.target.value})}}
            style={style.input} />
        </div>
      ))

    return (
      <div className="sign-up-wrapper">
        <Header 
          text={'注册'} 
          icon={'arrow'} 
          handleClick={() => {history.push('/search')}} />
        <div className="body"
          style={style.body}>
          <div className="logo-wrapper"
            style={style.logoWrapper}>
            <Logo color={'#C7C7C7'} />
          </div>
          <form 
            className="form-wrapper"
            onSubmit={(e) => {this.handleSubmit(e)}}
            style={style.formWrapper}>
            {itemsToDom}
            <Button
              disabled={
                isSubmit ||
                email === '' ||
                username === '' ||
                password1 === '' ||
                password2 === ''
              }
              type={'submit'}
              text={'注册'}
              style={{
                padding: '14px 0',
                marginTop: '25px'
              }} />
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp

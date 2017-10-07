import React, { Component } from 'react'
import superagent from 'superagent'

import Header from '../../components/Header'
import Logo from '../../components/Logo'
import Button from '../../components/Button'

import { signIn } from '../../api'

import './style.css'

const style = {}
style.body = {
  marginTop: '55px'
}
style.logoWrapper = {
  padding: '80px 0 66px 0'
}
style.inputGroup = {
  width: '300px',
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

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      isSubmit: false
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const {username, password} = this.state,
      { history } = this.props

    this.setState({isSubmit: true})
    
    superagent
      .post(signIn)
      .send(`username=${username}`)
      .send(`password=${password}`)
      .end((err, sres) => {
        if (err) {
          this.setState({isSubmit: false})
          throw err
        }

        if (sres.status >= 400){
          alert('用户名或密码错误')
          this.setState({isSubmit: false})
        }

        if (sres.status === 200) {
          history.push('/search')
        }
      })

  }

  render() {
    const { history } = this.props,
      { password, username, isSubmit } = this.state

    return (
      <div className="sign-in-wrapper">
        <Header
          text={'登录'}
          icon={'cross'}
          handleClick={() => {history.push('/search')}}
        />
        <div className="body"
          style={style.body}>
          <div className="logo-wrapper"
            style={style.logoWrapper}>
            <Logo color={'#C7C7C7'} />
          </div>
          <form 
            className="signin-input-group"
            onSubmit={(e) => {this.handleSubmit(e)}}
            style={style.inputGroup}>
            <input 
              type="text" 
              onChange={(e)=>{this.setState({username: e.target.value})}}
              style={style.input} placeholder={'用户名'} />
            <input
              type="password" 
              onChange={(e)=>{this.setState({password: e.target.value})}}
              style={style.input} placeholder={'密码'} />
            <Button
              type={'submit'}
              disabled={
                isSubmit ||
                username === '' ||
                password === ''
              }
              text={'登录'}
              style={{
                padding: '14px 0'
              }} />
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn

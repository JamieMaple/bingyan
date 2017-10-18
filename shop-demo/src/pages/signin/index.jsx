import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import superagent from 'superagent'

import Header from '../../components/Header'
import Logo from '../../components/Logo'
import Button from '../../components/Button'

import { signIn, tokenName } from '../../api'

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
style.others = {
  display: 'flex',
  color: '#0D9F67',
  marginTop: '10px',
  fontSize: '14px'
}
style.othersEach = {
  flex: '1'
}

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
      username: '',
      password: '',
      isSubmit: false
    }
  }

  componentDidMount() {
    this.setState({show: true})
    if(localStorage.getItem(tokenName)) {
      this.props.history.push('/search')
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
          alert('用户名或密码错误')
          this.setState({isSubmit: false})
          return
        }
        
        localStorage.setItem(tokenName, sres.body.token)

        if (sres.status === 200) {
          history.goBack()
        }
      })

  }

  render() {
    const { history } = this.props,
      { password, username, isSubmit, show } = this.state

    return (
      <div className="sign-in-wrapper">
        <Header
          text={'登录'}
          show={show}
          icon={'cross'}
          handleClick={() => {history.goBack()}}
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
            <div className="others"
              style={style.others}>
              <Link to='/signup'><span className="siginup" style={{...style.othersEach}}>没有账号?</span></Link>
              <span className="forget-password" style={{...style.othersEach, textAlign: 'right'}}>忘记密码</span>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn

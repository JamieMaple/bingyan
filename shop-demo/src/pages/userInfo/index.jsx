import React, { Component } from 'react'
import superagent from 'superagent'

import Header from '../../components/Header'
import Button from '../../components/Button'
import Icon from '../../components/Icon'

import { cleanLocalStorage } from '../../utills/cleanLocalStorage'
import { userInfo, type, tokenName } from '../../api'

const defaultAvatar = require('./avatar.jpg')

const style = {}
style.header = {
  fontSize: '18px',
  background: '#DBC8A8',
  color: '#fff'
}
style.body = {
  marginTop: '55px',
  padding: '10px 20px',
  color: '#919191'
}
style.rowWrapper = {
  display: 'flex',
  alignItems: 'center'
}
style.avatar = {
  height: '80px',
  width: '80px',
  borderRadius: '50%',
  background: '#D8D8D8'
}
style.colRight = {
  flex: '1',
  marginLeft: '40px'
}
style.lineWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: '1px solid #E6E9ED',
  lineHeight: '20px'
}
style.lineLeftText = {
  width: '60px',
  textAlign: 'left'
}
style.lineRightText = {
  flex: '1',
  textAlign: 'right',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

class UserInfo extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
      username: '',
      email: '',
      avatar: defaultAvatar,
      sex: ''
    }
  }

  componentDidMount() {
    const token = localStorage.getItem(tokenName),
      { history } = this.props

    this.setState({show: true})

    if (token) {
      superagent
        .post(userInfo)
        .send(`token=${token}`)
        .send(`type=${type.GET_INFO}`)
        .end((err, sres) => {
          if (sres && sres.status === 200) {
            const { username, email, sex, avatar=defaultAvatar } = sres.body
            this.setState({
              username,
              email,
              avatar,
              sex
            })
          } else {
            cleanLocalStorage()
            alert('登录失效')
            history.push('/')
          }
        })
    } else {
      alert('没有登录，请重新登录?')

      history.push('/')
    }
  }

  handleClick(history) {
    const isSignOut = window.confirm('你确定要退出么?')

    if (isSignOut) {
      cleanLocalStorage()
      history.push('/')
    }
  }

  render() {
    const { history } = this.props
    let { show, username, email, avatar, sex } = this.state,
      genderIcon,
      genderColor = '#E6E9ED'
    
    if (sex === 0) {
      sex = '女'
      genderIcon = 'female'
      genderColor = '#FF007B'
    } else if (sex === 1) {
      sex = '男'
      genderIcon = 'male'
      genderColor = '#BDE4F4'
    } else {
      sex = '未知'
      genderIcon = 'unknowGender'
    }

    return (
      <div className="userinfo-wrapper">
        <Header
          icon={'arrow'}
          show={show}
          handleClick={() => {history.goBack()}}
          text={'用户设置'}
          style={style.header} />
        <div className="body-wrapper"
          style={style.body}>
          <div className="row-1"
            style={style.rowWrapper}>
            <div className="col-left">
              <img
                src={avatar}
                style={style.avatar} 
                alt="" />
            </div>
            <div className="col-right"
              style={style.colRight}>
              <div className="username-group"
                style={style.lineWrapper}>
                <span style={style.lineLeftText}>用户名</span>
                <span style={{...style.lineRightText, maxWidth: '100px'}}>{username}</span>
              </div>
              <div className="sex-group"
                style={style.lineWrapper}>
                <span style={style.lineLeftText}>性别</span>
                <span style={style.lineRightText}><Icon type={genderIcon} style={{color: genderColor}} />{sex}</span>
              </div>
            </div>
          </div>
          <div className="email-group"
            style={{...style.lineWrapper, margin: '20px 0 40px'}}>
            <span style={style.lineLeftText}>邮箱</span>
            <span style={style.lineRightText}>{email}</span>
          </div>
          <Button
            text={'退出登录'}
            handleClick={() => {this.handleClick(history)}}
            style={{
              padding: '14px',
              background: '#EA4F4F'
            }} />
        </div>
      </div>
    )
  }
}

export default UserInfo

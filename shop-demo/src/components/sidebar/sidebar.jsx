import React, { Component } from 'react'
import superagent from 'superagent'

import { tokenName, tokenVerify } from '../../api'
import cleanLocalStorage from '../../utills/cleanLocalStorage'

import Mask from '../Mask'
import Logo from '../Logo'
import Button from '../Button'
import Icon from '../Icon/'
import Navigator from './nav'

import style from './style'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignin: false,
      token: ''
    }
    this.toggleShow = this.toggleShow.bind(this)
  }

  toggleShow() {
    this.props.handleClick()
  }

  handleLogOut() {
    const logout = window.confirm('你确定要注销么'),
      { history } = this.props

    if(logout) {
      cleanLocalStorage()

      this.setState({isSignin: false, token: ''})
      this.toggleShow()
      history.push('/search')
    }
  }

  componentDidMount() {
    const token = localStorage.getItem(tokenName)
    if (token) {
      superagent
        .post(tokenVerify)
        .send(`token=${token}`)
        .end((err, sres) => {
          if (err) {
            throw err
          }

          if (sres && sres.status === 200) {
            this.setState({
              isSignin: true,
              token
            })
          }else{
            cleanLocalStorage()
            alert('登录超时，请重新登录')
          }
        })
    }
  }

  render() {
    let show = {}, mask = null,
      buttons = [
        {
          text: '登录',
          path: '/signin'
        },
        {
          text: '注册',
          path: '/signup'
        }
      ],
      settings = (
        <div className="settings-wrapper"
          style={style.settingsWrapper} >
          <span
            onClick={() => {this.handleLogOut()}}
            style={style.logOut} >注销</span>
          <Icon
            type={'settings'}
            style={style.settings} />
        </div>
      )

    buttons = buttons.map((button, index) => (
      <Button key={`button-${index}`}
        text={button.text}
        path={button.path}
        style={{
          flex: '1',
          background: 'green',
          borderRadius: '0'
        }} />
    ))


    if (this.props.showSidebar) {
      show = {transform: 'translate3d(0,0,0)', boxShadow: '0px -2px 10px rgb(7, 17, 27)', opacity: '1'}
      mask = (
        <div className="mask-wrapper"
          onClick={this.toggleShow}
          style={style.maskWrapper}>
          <Mask />
        </div>
      )
    }

    return (
      <div className="sidebar-group"
        onMouseMove={(e) => {e.preventDefault()}}
        style={style.sidebarGroup}>
        <div className="sidebar-wrapper"
          style={Object.assign({}, style.sidebarWrapper, show)}>
          <div className="logo-wrapper"
            style={style.logoWrapper}>
            <Logo color={'#C7C7C7'} size={'medium'} />
          </div>
          <Navigator isSignin={this.state.isSignin} toggleShow={this.toggleShow} />
          <div className="user-sign"
            style={style.buttonGroup}>
            {this.state.isSignin ? settings : buttons}
          </div>
        </div>
        {mask}
      </div>
    )
  }
}

export default SideBar

import React, { Component } from 'react'

import Mask from '../mask'
import Logo from '../logo'
import Button from '../button'
import Navigator from './nav'

import style from './style'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttons: [
        {
          text: '登录',
          path: '/signin'
        },
        {
          text: '注册',
          path: '/signup'
        }
      ]
    }
    this.toggleShow = this.toggleShow.bind(this)
  }
  toggleShow() {
    this.props.handleClick()
  }
  render() {
    let show = {}, mask = null
    let buttons = this.state.buttons.map((button, index) => (
        <Button key={`button-${index}`}
          text={button.text}
          flex={1}
          background={'green'}
          path={button.path}
          borderRadius={0} />
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
            <Logo color={"#C7C7C7"} size={"medium"} />
          </div>
          <Navigator toggleShow={this.toggleShow} />
          <div className="user-sign"
            style={style.buttonGroup}>
            {buttons}
          </div>
        </div>
        {mask}
      </div>
    )
  }
}

export default SideBar

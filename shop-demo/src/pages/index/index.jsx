import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { tokenName } from '../../api'

import BackgroundImg from '../../components/BackgroundImg'
import Mask from '../../components/Mask'
import Button from '../../components/Button'
import Logo from '../../components/Logo'

const style = {}
style.backgroundItem = {
  position: 'fixed',
  left: '0',
  right: '0',
  height: '100%',
  width: '100%',
  zIndex: '-10'
}
style.logoGroup = {
  position: 'relative',
  top: '153px'
}
style.buttonGrop = {
  position: 'absolute',
  left: '0',
  right: '0',
  bottom: '10px'
}
style.buttonDiv = {
  width: '90%',
  height: '50px',
  margin: 'auto'
}
style.footerTitle = {
  textAlign: 'center',
  marginTop: '15px',
  padding: '10px',
  fontWeight: '300',
  fontSize: '14px',
  color: '#fff'
}

const bgImg = require('./img.png')

class Index extends Component {

  componentDidMount() {
    const history = this.props.history
    if (localStorage.getItem(tokenName)) {
      history.push('/search')
    }
  }

  render() {
    return (
      <div>
        <div className="background-group">
          <div className="mask"
            style={style.backgroundItem}>
            <Mask opacity={'.35'} />
          </div>
          <div className="backgroundImg"
            style={{...style.backgroundItem, zIndex: '-20'}}>
            <BackgroundImg
              src={bgImg}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                opacity: '.8'
              }}/>
          </div>
        </div>
        <div className="logo-group"
          style={style.logoGroup}>
          <Logo />
        </div>
        <div className="button-group"
          style={style.buttonGrop}>
          <div className="button-1"
            style={Object.assign({}, style.buttonDiv, {marginBottom: '15px'})}>
            <Button
              path="/signup"
              text="注册"
              style={{
                background:'green'
              }}/>
          </div>
          <div className="button-2"
            style={style.buttonDiv}>
            <Button
              text="待会再说"
              path="/search" 
              style={{
                background: 'blue'
              }}/>
          </div>
          <div className="footer-sigin">
            <h3 className="footer-title"
              style={style.footerTitle}><Link to="/signin">已有账号?</Link></h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Index

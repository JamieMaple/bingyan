import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import superagent from 'superagent'

// token verify
import { tokenName, tokenVerify } from '../../api'
import cleanLocalStorage from '../../utills/cleanLocalStorage'

// components
import BackgroundImg from '../../components/BackgroundImg'
import Mask from '../../components/Mask'
import Button from '../../components/Button'
import Logo from '../../components/Logo'

// animation
import AnimateTransition from '../../components/AnimateTransition'

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
  constructor() {
    super()
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    const history = this.props.history
    const token = localStorage.getItem(tokenName)
    if(token) {
      superagent
        .post(tokenVerify)
        .send(`token=${token}`)
        .end((err, sres) => {
          if (sres && sres.status === 200) {
            history.push('/search')
          }else{
            cleanLocalStorage()
          }
        })
    }
    this.setState({show: true})
  }

  render() {
    const { show } = this.state
    return (
      <div className="index-wrapper">
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
          <AnimateTransition
            in={show}
            classNames="scale"
          >
            <Logo />
          </AnimateTransition>
        </div>
        <div className="button-group"
          style={style.buttonGrop}>
          <AnimateTransition classNames="slide-bottom-top-short" in={show}>
            <div className="button-1"
              style={Object.assign({}, style.buttonDiv, {marginBottom: '15px'})}>
              <Button
                path="/signup"
                text="注册"
                style={{
                  background:'green'
                }}/>
            </div>
          </AnimateTransition>
          <AnimateTransition classNames="slide-bottom-top-short" in={show}>
            <div className="button-2"
              style={style.buttonDiv}>
              <Button
                text="待会再说"
                path="/search" 
                style={{
                  background: 'blue'
                }}/>
            </div>
          </AnimateTransition>
          <AnimateTransition
            in={show}
            classNames="fade"
          >
            <div className="footer-sigin">
              <h3 className="footer-title"
                style={style.footerTitle}><Link to="/signin">已有账号?</Link></h3>
            </div>
          </AnimateTransition>
        </div>
      </div>
    )
  }
}

export default Index

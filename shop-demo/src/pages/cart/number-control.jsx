import React, { Component } from 'react'

import Icon from '../../components/icon'

const style = {}
style.wrapper = {
  fontSize: '22px',
  lineheight: '30px'
}
style.number = {
  display: 'inline-block',
  lineHeight: '32px',
  height: '32px',
  padding: '0 5px',
  fontSize: '16px',
  color: '#8C8C8C',
  verticalAlign: 'bottom'
}

class NumberControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttons: [
        {
          type: 'minus',
          color: '#EA4F4F'
        },
        {
          type: 'plus',
          color: '#0D9F67'
        }
      ]
    }
  }
  render() {
    const buttons = this.state.buttons.map((button, index) => (
      <Icon key={`button-${index}`}
        type={button.type}
        display={"inline-block"}
        boxSizing={"border-box"}
        color={button.color}
        padding={"5px"} />
    ))
    return (
      <div className="number-control"
        style={style.wrapper}>
        {buttons[0]}
        <span style={style.number}>2</span>
        {buttons[1]}
      </div>
    )
  }
}

export default NumberControl

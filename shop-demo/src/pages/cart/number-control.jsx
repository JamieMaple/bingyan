import React, { Component } from 'react'

import Icon from '../../components/Icon'

const style = {}
style.wrapper = {
  fontSize: '22px',
  lineheight: '30px'
}
style.number = {
  display: 'inline-block',
  lineHeight: '32px',
  height: '32px',
  padding: '0 10px',
  fontSize: '16px',
  color: '#8C8C8C',
  verticalAlign: 'bottom'
}
style.button={
  display: 'inline-block',
  boxSizing: 'border-box',
  padding: '5px 0'
}

class NumberControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttons: [
        {
          field: '-',
          type: 'minus',
          color: '#EA4F4F'
        },
        {
          field: '+',
          type: 'plus',
          color: '#0D9F67'
        }
      ]
    }
  }
  render() {
    const { quantity, handleQuantity } = this.props,
      buttons = this.state.buttons.map((button, index) => (
        <Icon 
          key={`button-${index}`}
          type={button.type}
          handleClick={() => {handleQuantity(button.field)}}
          style={{...style.button, color: button.color}} />
      ))
    return (
      <div className="number-control"
        style={style.wrapper}>
        {buttons[0]}
        <span style={style.number}>{quantity}</span>
        {buttons[1]}
      </div>
    )
  }
}

NumberControl.defaultProps = {
  quantity: 1
}

export default NumberControl

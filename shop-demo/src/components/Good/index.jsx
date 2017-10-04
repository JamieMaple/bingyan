import React from 'react'
import Icon from '../Icon'

const style = {} 
style.goodWrapper = {
  position: 'relative',
  width: '170px',
  height: '225px',
  margin: '8px 8px',
  padding: '14px',
  background: '#fff',
  boxShadow: '-3px 3px 30px #F3F3F3',
  borderRadius: '5px'
}
style.name = {
  fontSize: '16px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#666666'
}
style.desc = {
  margin: '6px 0 3px',
  fontSize: '12px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#919191'
}
style.price = {
  position: 'absolute',
  left: '14px',
  bottom: '20px',
  marginTop: '15px',
  fontSize: '14px',
  color: '#0D9F67'
}

const Good = ({id, name, description, img, price}) => (
  <div
    className="good-wrapper"
    style={style.goodWrapper}
  >
    <h1 className="good-name"
      style={style.name}>{name}</h1>
    <p className="good-desc"
      style={style.desc}>{description}</p>
    <img src={img} width="130" height="130" alt={name}/>
    <span
      style={style.price}>￥{price}</span>
    <Icon 
      type={'lineheart'}
      position={'absolute'}
      bottom={'20px'}
      right={'14px'}
    />
  </div>
)

export default Good
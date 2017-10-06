import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Icon from '../Icon'

const style = {} 
style.goodWrapper = {
  position: 'relative',
  width: '170px',
  height: '225px',
  margin: '5px 5px',
  padding: '14px',
  background: '#fff',
  boxShadow: '-5px 5px 30px #F3F3F3',
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
      style={style.price}>￥{price.toFixed(2)}</span>
    <Icon 
      type={'fullheart'}
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '14px',
        zIndex: '10',
        color: '#C7C7C7'
      }}
    />
    <Link 
      to={{
        pathname:`/good/${id}`,
        state: {id, name, description, img, price}
      }} 
      style={{
        display: 'block',
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        zIndex: '5'
      }}/>
  </div>
)

Good.proptypes = {
  id: PropTypes.string, 
  name: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string, 
  price: PropTypes.string
}
Good.defaultProps = {
  id: '',
  name: '',
  description: '',
  img: '',
  price: 30
}

export default Good
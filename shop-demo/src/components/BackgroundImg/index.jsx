import React from 'react'

const bgStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  transition: 'all .2s ease'
}

function BackgroundImg({img, style}) {
  return (
    <img
      src={img}
      alt=""
      onLoad={(e) => {e.target.style.opacity = '0.8'}}
      style={{...bgStyle, ...style}} />
  )
}
BackgroundImg.defaultProps = {
  img: '',
  style: {}
}

export default BackgroundImg

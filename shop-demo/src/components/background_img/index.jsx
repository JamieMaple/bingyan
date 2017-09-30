import React from 'react'

const bgStyle = {
  position: 'absolute',
}

const BackgroundImg = (({src, style}) => (
  <img
    src={src}
    alt="background"
    style={Object.assign({}, bgStyle, style)} />
))
BackgroundImg.defaultProps = {
  src: '',
  style: {}
}

export default BackgroundImg

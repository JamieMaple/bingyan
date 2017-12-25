import React from 'react'
import PropTypes from 'prop-types'

const style = {
  width: '100%',
  height: '100%',
  background: '#000',
  opacity: '0.65',
  zIndex: '-10'
}

const Mask = ({ handleClick, touchMove, ..._style }) => {
  return (
    <div
      className="mask"
      onTouchMove={(e)=>{!touchMove && e.preventDefault()}}
      onClick={(e) => {
        handleClick()
      }}
      style={Object.assign({}, style, _style)}></div>
  )
}

Mask.propTypes = {
  handleClick: PropTypes.func,
  touchMove: PropTypes.bool
}

Mask.defaultProps = {
  handleClick: function() {},
  touchMove: false
}

export default Mask

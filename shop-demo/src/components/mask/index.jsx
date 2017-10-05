import React from 'react'
import PropTypes from 'prop-types'

const style = {
  width: '100%',
  height: '100%',
  background: '#000',
  opacity: '0.65',
  zIndex: '-10'
}

const Mask = ({ handleClick, ..._style }) => {
  return (
    <div
      className="mask"
      onClick={(e) => {
        handleClick()
      }}
      style={Object.assign({}, style, _style)}></div>
  )
}

Mask.propTypes = {
  handleClick: PropTypes.func
}

Mask.defaultProps = {
  handleClick: function() {}
}

export default Mask

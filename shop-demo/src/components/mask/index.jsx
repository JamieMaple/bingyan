import React from 'react'

const style = {
  width: '100%',
  height: '100%',
  background: '#000',
  opacity: '0.65',
  zIndex: '-10'
}

const Mask = (({ ..._style }) => {
  return (
    <div
     className="mask"
     style={Object.assign({}, style, _style)}></div>
  )
})

export default Mask

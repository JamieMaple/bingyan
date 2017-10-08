import React from 'react'

import './style.css'

const Loader = ({style}) => (
  <div className="spinner" style={style}>
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
  </div>
)

export default Loader
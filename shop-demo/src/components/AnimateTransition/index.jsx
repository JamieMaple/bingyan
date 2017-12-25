import React from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import './fade.css'
import './scale.css'
import './slide.css'
 
const AnimateTransition = ({ children, classNames, ...props }) => (
  <CSSTransition
    timeout={1000}
    classNames={classNames}
    {...props}
  >
    {children}
  </CSSTransition>
)

AnimateTransition.defaultProps = {
  children: PropTypes.element.isRequired,
  classNames: PropTypes.string.isRequired
}

export default AnimateTransition
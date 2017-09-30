import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SideBar from './sidebar.jsx'
const icons = {
  arrow: 'ion-ios-arrow-left',
  cross: 'ion-ios-close-empty',
  nav: 'ion-navicon'
}

const style = {}
style.leftSide = {
  display: 'inline-block',
  position: 'fixed',
  padding: '0 5px',
  zIndex: '50',
  lineHeight: '10px',
  height: '20px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: 'transparent'
}

const LeftSide = (({type, handleLeftClick}) => (
  <span className="left-sidebar"
    onClick={handleLeftClick}
    style={style.leftSide}>
    <i className={icons[type]}></i>
  </span>
))
class SideBarControl extends Component {
  constructor(props) {
    super(props)
    this.state = {showSidebar: false}
    this.handleLeftClick = this.handleLeftClick.bind(this)
  }
  handleLeftClick() {
    this.setState({showSidebar: !this.state.showSidebar})
  }
  render() {
    return (
      <div className="sidebar-control">
        <LeftSide
          type={this.props.icon}
          handleLeftClick={this.handleLeftClick} />
        <SideBar
          showSidebar={this.state.showSidebar}
          handleClick={this.handleLeftClick} />
      </div>
    )
  }
}

SideBarControl.propTypes = {
  icon: PropTypes.string,
  handleLeftClick: PropTypes.func
}
SideBarControl.defaultProps = {
  icon: 'nav'
}

export default SideBarControl

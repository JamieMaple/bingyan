import React from 'react'

const style = {}
style.wrapper = {
  width: '170px',
  margin: '50px 5px'
}
style.title = {
  margin: 'auto',
  textAlign: 'center',
  color: '#919191'
}

const NoMore = ({text, WrapperStyle}) => (
  <div
    className="no-more"
    style={{...style.wrapper, ...WrapperStyle}}>
    <h1 style={style.title}>（*+﹏+*）~ {text}</h1>
  </div>
)
NoMore.defaultProps = {
  text: '没有更多了'
}


export default NoMore

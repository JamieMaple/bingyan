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
style.defaultIcon = {
  position: 'absolute',
  bottom: '20px',
  right: '14px',
  zIndex: '10',
  color: '#C7C7C7'
}
style.favoriteIcon = {
  color: '#EA4F4F'
}

export default style
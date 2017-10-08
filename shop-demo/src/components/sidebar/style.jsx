const color = {
  gray: '#919191',
  green: '#0D9F67'
}
const style = {}
style.sidebarGroup = {
  height: '100%'
}
style.sidebarWrapper = {
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: '50',
  width: '250px',
  height: '100%',
  background: '#fff',
  color: color.gray,
  transition: 'transform .4s ease, opacity .3s ease-out',
  opacity: '.9',
  transform: 'translate3d(-100%,0,0)'
}
style.logoWrapper = {
  marginTop: '60px',
  marginBottom: '55px'
}
style.maskWrapper = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: '40'
}
style.navItem = {
  height: '40px',
  fontSize: '16px',
  fontWeight: '100'
}
style.itemName = {
  display: 'inline-block',
  height: '40px',
  lineHeight: '40px',
  padding: '0 16px 0 36px',
  borderLeft: '4px solid',
  borderLeftColor: 'transparent'
}
style.itemNameActive = {
  borderLeftColor: color.green,
  color: color.green
}
style.buttonGroup = {
  display: 'flex',
  position: 'absolute',
  left: '0',
  right: '0',
  width: '100%',
  bottom: '0',
  height: '60px',
  overflow: 'hidden'
}
style.settingWrapper = {
  fontSize: '16px'
}
style.logOut = {
  display: 'inline-block',
  position: 'absolute',
  left: '40px',
  padding: '5px'
}
style.settings = {
  position: 'absolute',
  right: '40px',
  padding: '5px'
}


export default style

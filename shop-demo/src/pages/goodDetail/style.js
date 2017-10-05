const style = {}
style.wrapper = {
  position: 'absolute',
  left: '0',
  right: '0',
  bottom: '0',
  top: '0',
  height: '100%'
}
style.body = {
  position: 'fixed',
  top: '50%',
  left: '2.5%',
  right: '2.5%',
  width: '95%',
  transform: 'translateY(-50%)',
  height: '95%',
  margin: '0 auto',
  background: '#fff',
  zIndex: '30',
  borderRadius: '5px'
}
style.header = {
  header: {
    position: 'fixed',
    top: '2.5%',
    left: '2.5%',
    width: '95%',
    zIndex: '40',
    color: '#fff'
  },
  name: {
    paddingTop: '10px',
    lineHeight: '25px',
    maxWidth: '75%',
    margin: '0 auto',
    textAlign: 'center',
    fontSize: '20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  icon: {
    position: 'absolute',
    top: '10px',
    fontSize: '25px'
  }
}
style.imgGroup = {
  position: 'relative',
  width: '100%',
  zIndex: '-10'
}
style.img = {
  width: '100%'
}
style.description = {
  width: '90%',
  margin: '25px auto 20px auto',
  fontSize: '14px 5px',
  color: '#919191'
}
style.priceQuantity = {
  width: '100%',
  height: '100px',
  borderTop: '1px solid #C1C1C1',
  borderBottom: '1px solid #C1C1C1'
}
style.boxCommon = {
  display: 'inline-block',
  height: '100%',
  width: '50%',
  color: '#666666'
}
style.boxTitle = {
  textAlign: 'center',
  margin: '14px 0 14px 0',
  fontSize: '16px'
}
style.quantity = {
  display: 'block',
  margin: 'auto',
  fontSize: '24px',
  color: '#919191'
}
style.price = {
  textAlign: 'center',
  fontSize: '24px',
  color: '#0D9F67'
}
style.buttonGroup = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '95%',
  margin: '12px auto'
}
style.button = {
  height: '50px',
  width: '90%',
  maxWidth: '325px',
  borderRadius: '0',
  marginBottom: '15px'
}

export default style
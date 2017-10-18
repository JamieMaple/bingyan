import selectImg from './select-bg.png'

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
  left: '5%',
  right: '5%',
  width: '90%',
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
    left: '5%',
    width: '90%',
    zIndex: '40',
    color: '#fff'
  },
  name: {
    paddingTop: '14px',
    maxWidth: '75%',
    margin: '0 auto',
    textAlign: 'center',
    fontSize: '16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  icon: {
    position: 'absolute',
    top: '16px',
    fontSize: '20px',
    color: '#C7C7C7'
  }
}
style.imgGroup = {
  position: 'relative',
  width: '100%',
  zIndex: '-10'
}
style.img = {
  height: '280px',
  width: '100%'
}
style.description = {
  width: '90%',
  margin: '25px auto 20px auto',
  fontSize: '14px',
  color: '#919191'
}
style.priceQuantity = {
  display: 'flex',
  width: '100%',
  height: '90px',
  borderTop: '1px solid #C1C1C1',
  borderBottom: '1px solid #C1C1C1'
}
style.boxCommon = {
  flex: '1',
  display: 'inline-block',
  height: '100%',
  color: '#666666'
}
style.boxTitle = {
  flex: '1',
  textAlign: 'center',
  margin: '14px 0 14px 0',
  fontSize: '16px'
}
style.quantity = {
  display: 'block',
  width: '70px',
  margin: 'auto',
  background: `url(${selectImg}) no-repeat right`,
  backgroundSize: '50%',
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
style.favoriteIcon = {
  color: '#EA4F4F'
}

export default style
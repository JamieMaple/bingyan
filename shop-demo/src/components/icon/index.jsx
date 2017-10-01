import React from 'react'

const iconGrop = {
  arrow: 'ion-chevron-left',
  nav: 'ion-navicon-round',
  cross: 'ion-android-close',
  plus: 'ion-plus-circled',
  minus: 'ion-minus-circled',
  fullheart: 'ion-ios-heart',
  lineheart: 'ion-ios-heart-outline',
  bag: 'ion-bag',
  cart: 'ion-ios-cart',
  search: 'ion-ios-search-strong',
  categories: 'ion-ios-pricetags-outline',
  favorite: 'ion-ios-heart-outline'
}
const style = {
  padding: '0 5px'
}

const Icon = (({type, handleClick, ..._style}) => (
  <i className={iconGrop[type]}
    onClick={handleClick}
    style={Object.assign({}, style, _style)}></i>
))
Icon.defaultProps = {
  type: 'nav'
}

export default Icon

import React, { Component } from 'react'
import superagent from 'superagent'
import { Scrollbars } from 'react-custom-scrollbars'

import { goodsAPI } from '../../api'

import Icon from '../../components/Icon/index'
import Good from '../../components/Good'

const style = {}
style.mainWrapper = {
  height: '100vh',
  background: '#F3F3F3',
}
style.header = {
  height: '200px',
  paddingTop: '90px',
  background: '#C5B08E',
  color: '#fff'
}
style.headerCategoryName = {
  textAlign: 'center',
  padding: '20px 0 10px 0',
  zIndex: '20',
  fontSize: '25px',
  fontWeight: '200',
  background: '#C5B08E',
  transition: 'all .2s ease'
}
style.headerCategoryInfo = {
  textAlign: 'center',
  fontSize: '12px',
  fontWeight: '100'
}
style.bodyWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '5px 0 10px'
}

const Header = ({name, description, handleBack}) => (
  <div className="header"
    style={style.header}>
    <Icon type={'arrow'} 
      handleClick={handleBack}
      style={{
        position: 'fixed',
        left: '15px',
        top: '20px',
        fontSize: '20px',
        zIndex: '30'
      }}
    />
    <h1 className="title-name"
      style={style.headerCategoryName}>{name}</h1>
    <p style={style.headerCategoryInfo}>{description}</p>
  </div>
)
const Body = ({goods}) => {
  const goodsToHtml = goods.map(good => (
    <Good 
      key={good._id}
      id={good._id}
      name={good.name}
      description={good.description}
      img={good.img}
      price={good.price}
    />
  ))
  return (
    <div className="body-wrapper"
      style={style.bodyWrapper}>
      {goodsToHtml}
    </div>
  )
}

class CategoryPage extends Component {
  constructor(props) {
    super(props)
    let { state } = this.props.location

    this.state = {
      id: this.props.match.params.id,
      name: state.title,
      description: state.desc,
      start: 0,
      goods: []
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll() {
    let scrollTop = document.documentElement.scrollTop,
      headerDOM = document.querySelector('.header'),
      titleDOM = document.querySelector('.title-name'),
      titleToHeaderTop = parseInt(headerDOM.style.paddingTop, 10)
    console.log(scrollTop)
    titleDOM.style.left='0'
    titleDOM.style.right='0'
    titleDOM.style.top='0'

    if (scrollTop >= titleToHeaderTop) {
      titleDOM.style.position = 'fixed'
      titleDOM.style.opacity = '0.9'
      titleDOM.style.boxShadow = '0 2px 8px rgb(145, 145, 145)'
    }else{
      titleDOM.style.position = 'static'
      titleDOM.style.opacity = '1'
      titleDOM.style.boxShadow = 'none'
    }
  }

  componentDidMount() {
    superagent
      .get(goodsAPI)
      .query({category: this.state.id, start: this.state.start})
      .end((err, sres) => {
        if(err) {
          console.log(err)
        }
        
        const goods = sres.body
        this.setState({goods})
      })
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render(){
    const { history } = this.props
    const { name, description, goods } = this.state

    return (
      <Scrollbars style={style.mainWrapper}>
        <Header 
          name={name}
          description={description}
          handleBack={() => {history.goBack()}} />
        <Body goods={goods} />
      </Scrollbars>
    )
  }
}

export default CategoryPage
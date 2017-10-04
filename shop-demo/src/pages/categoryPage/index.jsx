import React, { Component } from 'react'
import superagent from 'superagent'

import Icon from '../../components/Icon/index'
import Good from '../../components/Good'

const style = {}
style.mainWrapper = {
  minHeight: '100vh', 
  background: '#fff'
}
style.header = {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  height: '200px',
  background: '#C5B08E',
  color: '#fff'
}
style.headerCategoryName = {
  textAlign: 'center',
  margin: '90px 0 5px',
  fontSize: '25px',
  fontWeight: '200'
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
  padding: '5px 0 10px',
  marginTop: '200px'
}

const Header = ({name, description, handleBack}) => (
  <div className="header"
    style={style.header}>
    <Icon type={'arrow'} 
      handleClick={handleBack}
      position={'fixed'}
      left={'15px'}
      top={'20px'}
      fontSize={'20px'}
    />
    <h1 style={style.headerCategoryName}>{name}</h1>
    <p style={style.headerCategoryInfo}>{description}</p>
  </div>
)
const Body = ({goods}) => {
  const goodsToHtml = goods.map(good => (
    <Good 
      key={good._id}
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
    this.state = {
      id: this.props.match.params.id,
      name: '',
      description: '',
      start: 0,
      goods: []
    }
  }
  componentDidMount() {
    superagent
      .get('http://localhost:3001/api/categories')
      .query({id: this.state.id})
      .end((err, sres) => {
        if (err) {
          console.log(err)
        }
        
        const { name='未知分类', description='暂无介绍' } = JSON.parse(sres.text)[0]
        this.setState({name, description})
      })
    superagent
      .get('http://localhost:3001/api/category')
      .query({id: this.state.id, start: this.state.start})
      .end((err, sres) => {
        if(err) {
          console.log(err)
        }
        const goods = JSON.parse(sres.text)
        this.setState({goods})
      })
  }
  render(){
    const { history } = this.props
    const { name, description, goods } = this.state

    return (
      <div className="goods-wrapper"
        style={style.mainWrapper}>
        <Header 
          name={name}
          description={description}
          handleBack={() => {history.goBack()}} />
        <Body goods={goods} />
      </div>
    )
  }
}

export default CategoryPage
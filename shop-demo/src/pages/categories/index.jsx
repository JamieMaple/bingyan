import React, { Component } from 'react'
import superagent from 'superagent'

import Header from  '../../components/Header'
import Category from './category'

const style = {}
style.body = {
  marginTop: '55px'
}

class Categories extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: []
    }
  }
  componentDidMount() {
    superagent
      .get('http://localhost:3001/api/categories')
      .end((err, sres) => {
        if (err) {
          console.log(err)
        }
        const resText = JSON.parse(sres.text)
        this.setState({categories: resText})
      })
  }
  render() {
    const categories = this.state.categories.map((category, index) => (
      <Category
        key={category._id}
        id={category.id}
        title={category.name}
        desc={category.description}
        style={{borderBottom: 'none'}} />
    ))
    return (
      <div className="categories-wrapper">
        <Header text={'分类'} boxShadow={'0px 1px 5px #919191'} />
        <div className="body-wrapper"
          style={style.body}>
          {categories}
        </div>
      </div>
    )
  }
}
export default Categories

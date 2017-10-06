import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import superagent from 'superagent'

import { categoriesAPI } from '../../api'

import Header from  '../../components/Header'
import Category from './category'
import Loader from '../../components/Loader/'

const style = {}
style.body = {
  marginTop: '55px'
}

class Categories extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      categories: []
    }
  }
  componentDidMount() {
    superagent
      .get(categoriesAPI)
      .end((err, sres) => {
        if (err) {
          console.log(err)
        }
        const resText = sres.body
        this.setState({categories: resText, isLoading: false})
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
        <Header text={'分类'}
          style={{
            boxShadow: '0px 1px 5px #919191'
          }} />
        <Scrollbars style={{height: '100vh'}}>
          <div className="body-wrapper"
            style={style.body}>
            {categories}
          </div>
        </Scrollbars>
        {this.state.isLoading ? <Loader style={{position: 'absolute', top: '20%', left: '0', right: '0'}} /> : null}
      </div>
    )
  }
}

export default Categories

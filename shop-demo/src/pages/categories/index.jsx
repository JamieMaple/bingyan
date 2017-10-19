import React, { Component } from 'react'
import superagent from 'superagent'

import { categoriesAPI } from '../../api'

import Header from  '../../components/Header'
import Category from './category'
import Loader from '../../components/Loader/'

const style = {}
style.body = {
  position: 'absolute',
  top: '55px',
  left: '0',
  right: '0',
  overflow: 'hidden'
}

class Categories extends Component {
  timeListeners = []

  constructor(props) {
    super(props)

    this.state = {
      show: false,
      isLoading: true,
      categories: []
    }
  }

  componentDidMount() {
    this.setState({show: true})

    superagent
      .get(categoriesAPI)
      .end((err, sres) => {
        if (err) {
          console.log(err)
        }
        const categories = sres.body.map(item => ({...item, show: false}))

        this.setState({categories: categories, isLoading: false})

        categories.forEach((item1, index1) => {
          const timeListener = setTimeout(() => {
            this.setState({categories: categories.map((item2, index2) =>
              index1 >= index2 ? {...item2, show: true} : item2
            )})
          }, 100 * index1)
          this.timeListeners.push(timeListener)
        })
      })
  }

  componentWillUnmount() {
    this.timeListeners.forEach(item => clearTimeout(item))
  }

  render() {
    const { show } = this.state,
      categories = this.state.categories.map((category, index) => (
        <Category
          key={category._id}
          show={category.show}
          id={category.id}
          title={category.name}
          desc={category.description}
        />
      ))
    
    return (
      <div className="categories-wrapper">
        <Header 
          show={show}
          text={'分类'}
          style={{
            boxShadow: '0px 1px 5px #919191'
          }} />
        <div className="body-wrapper"
          style={style.body}>
          {categories}
        </div>
        {this.state.isLoading ? <Loader style={{position: 'absolute', top: '20%', left: '0', right: '0'}} /> : null}
      </div>
    )
  }
}

export default Categories

import React, { Component } from 'react'

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
      items: [
        {
          id: '12394',
          title: '分类1',
          desc: 'description'
        },
        {
          id: '22394',
          title: '分类2',
          desc: 'description'
        },
        {
          id: '12354',
          title: '分类3',
          desc: 'description'
        },
        {
          id: '15394',
          title: '分类4',
          desc: 'description'
        },
        {
          id: '12364',
          title: '分类5',
          desc: 'description'
        },
        {
          id: '12994',
          title: '分类6',
          desc: 'description'
        },
        {
          id: '10394',
          title: '分类7',
          desc: 'description'
        },
        {
          id: '09394',
          title: '分类8',
          desc: 'description'
        },
        {
          id: '12390',
          title: '分类9',
          desc: 'description'
        }
      ]
    }
  }
  render() {
    const categories = this.state.items.map((item, index) => (
      <Category
        key={`category-${index.toString()}`}
        match={{params: {id: item.id}, url: '/categories'}}
        title={item.title}
        desc={item.desc}
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

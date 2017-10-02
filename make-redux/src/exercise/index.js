import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import ThemeSwitch from './contextAndStore/ThemeSwitch'

const userReducer = (users = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'ADD_USER':
      return [...users, action.user]
    case 'DELETE_USER':
      return users.filter((user, index) => index !== action.index)
    default:
      return users
  }
}

const store = createStore(userReducer)

class User extends Component {
  render () {
    const { user, deleteUser, index } = this.props
    return (
      <div>
        <div>Name: {user.username}</div>
        <div>Age: {user.age}</div>
        <div>Gender: {user.gender}</div>
        <button onClick={() => {deleteUser(index)}}>删除</button>
      </div>
    )
  }
}

class UsersList extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      age: 0,
      gender: ''
    }
  }
  handleClick() {
    this.props.addUser(this.state)
  }
  render () {
    const { users, addUser, deleteUser } = this.props
    return (
      <div>
        {/* 输入用户信息，点击“新增”按钮可以增加用户 */}
        <div className='add-user'>
          <div>Username: <input type='text' onChange={(e) => {this.setState({username: e.target.value})}} /></div>
          <div>Age: <input type='number' onChange={(e) => {this.setState({age: Number(e.target.value)})}} /></div>
          <div>Gender:
            <label>Male: <input type='radio' name='gender' value='male' onChange={(e) => {this.setState({gender: e.target.value})}} /></label>
            <label>Female: <input type='radio' name='gender' value='female' onChange={(e) => {this.setState({gender: e.target.value})}} /></label>
          </div>
          <button onClick={
            () => {
              addUser(this.state)
              }
            }
          >增加</button>
        </div>
        {/* 显示用户列表 */}
        <div className='users-list'>{users.map((user, index) => 
          <User 
            key={`user-${index}`}
            index={index}
            user={user}
            deleteUser={deleteUser}
            />
        )}</div>
      </div>
    )
  }
}

class UsersContainer extends Component {
  render() {
    console.log(this.props)
    return (
      <UsersList
        addUser={this.props.addUser.bind(this)}
        deleteUser={this.props.deleteUser.bind(this)}
        users={this.props.users}
      />
    )
  }
}

const mapStateToProps = (users) => {
  return {
    users: users
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => {
      dispatch({type: 'ADD_USER', user: user})
    },
    deleteUser: (index) => {
      dispatch({type: 'DELETE_USER', index: index})
    }
  }
}
UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

render(
  <Provider store={store}>
    <UsersContainer />
  </Provider>,
  document.getElementById('root')
)
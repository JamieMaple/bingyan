import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  addOne,
  minusOne
} from '../actions'

import Counter from '../components/Counter'
import DecrementButton from '../components/DecrementButton'
import IncrementButton from '../components/IncrementButton'

class ButtonGroup extends Component {
  render() {
    const { value, onIncrement, onDecrement } = this.props
    return (
      <div>
        <Counter value={value} />
        <IncrementButton onIncrement={onIncrement} />
        <DecrementButton onDecrement={onDecrement} />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    value: state
  }
}

const mapDispatch = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch(addOne())
    },
    onDecrement: () => {
      dispatch(minusOne())
    }
  }
}

export default connect(mapState, mapDispatch)(ButtonGroup)
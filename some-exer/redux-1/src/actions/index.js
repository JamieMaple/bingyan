import {
  ADD_ONE,
  MINUS_ONE
} from '../actionTypes'

export const addOne = function() {
  return {
    type: ADD_ONE
  }
}

export const minusOne = function() {
  return {
    type: MINUS_ONE
  }
}
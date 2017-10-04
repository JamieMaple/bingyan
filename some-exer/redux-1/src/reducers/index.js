import {
  ADD_ONE,
  MINUS_ONE
} from '../actionTypes'
export const reducer = function(state = 0, action) {
  switch (action.type) {
    case ADD_ONE:
      return state + 1
    case MINUS_ONE: 
      return state - 1
    default:
      return state
  }
}
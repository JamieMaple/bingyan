import React from 'react'

function IncrementButton({onIncrement}) {
  return (
    <button onClick={onIncrement}>
      增加1
    </button>
  )
}

export default IncrementButton
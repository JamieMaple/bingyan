import React from 'react'

function DecrementButton({onDecrement}) {
  return (
    <button onClick={onDecrement}>
      减少1
    </button>
  )
}

export default DecrementButton
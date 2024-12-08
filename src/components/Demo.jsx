import React, { useState } from 'react'

function Demo() {
    const [state , setState] = useState([1,2,3,4,5])
    const addArray = (prevState) => {
        console.log("This is prevState",prevState);
        prevState.push(6)
        console.log("This is new State",prevState);
        return prevState
    }

    setState(prevState =>  addArray(prevState))
  return (
    <div>Demo</div>
  )
}

export default Demo
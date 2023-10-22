import React from 'react'

function Progess({index, numberOfQuestions, maxPoints, points}) {
  return (
    <header className='progress'>
        <progress max={numberOfQuestions} value={index+1} />
        <p>Questions <strong>{index+1}</strong> / {numberOfQuestions}</p>
        <p><strong>{points}</strong> / {maxPoints} </p>
    </header>
  )
}

export default Progess
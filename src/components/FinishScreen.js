import React from 'react'

function FinishScreen({points, maxPoints, highscore, dispatch}) {
    const percentage = (points/maxPoints)*100
  return (
    <>
      <p className='result'>You score <strong>{points}</strong> out of {maxPoints} ({Math.round(percentage)}%) </p>
      <p className='highscore'> (Highscore : {highscore} points) </p>
      <button className='btn btn-ui' onClick={()=>dispatch({type:"restart"})} >Restart test</button>
    </>
  )
}

export default FinishScreen
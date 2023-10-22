import React from 'react'

function NextButton({dispatch, answer, index, numberOfQuestions}) {
    if(answer === null) return null;
    
    if(index+1<numberOfQuestions)
        return (
            <button className='btn btn-ui' onClick = {()=>dispatch({type: 'nextQuestion'})} >Next</button>
        )
    return(
        <button className='btn btn-ui' onClick = {()=>dispatch({type: 'finish'})} >Finish</button> )
}

export default NextButton
import { useReducer, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import data from "../data/questions.json"
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progess from "./Progess";
import FinishScreen from "./FinishScreen";




function App() {

  const intialState = {
    questions: [],
    status: 'loading',
    index : 0,
    answer: null,
    points: 0,
    highscore: 0,

  }


  const reducer = (state, action) => {
    switch (action.type) {
      case 'dataReceived':
        return {
          ...state,
          questions: action.payload.questions,
          status: "ready"
        };

      case 'dataFailed':
        return {
          ...state,
          status: "error"
        }
      case 'start' :
        return {...state, status: "active"}
      
      case 'newAnswer' :
        const questions = state.questions.at(state.index);

        return {...state,  
            answer: action.payload, 
            points: action.payload = questions.correctOption? state.points + questions.points : state.points }
      case 'nextQuestion':
          return{
            ...state, index: state.index+1, answer:null
          }
      case 'finish':
        return{
          ...state, status : "finish", highscore : state.highscore>points ? state.highscore : points
        }

      case 'restart':
          return{
            ...state,
            status: 'ready',
            index : 0,
            answer: null,
            points: 0,
          }
      default:
        throw new Error("Action is unknwon");
    }
  }

  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(reducer, intialState)

  const maxPoints = questions.reduce((prev, current)=>prev+current.points, 0);


  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'dataReceived', payload: data })
    }, 1000)
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numberOfQuestoins= {questions.length} dispatch= {dispatch} /> }
        {status === "active" && 
          <>
            <Progess index={index} numberOfQuestions= {questions.length} points ={points} maxPoints={maxPoints} />      
            <Questions questions={questions[index]} dispatch= {dispatch} answer={answer} /> 
            <NextButton dispatch={dispatch} answer={answer} numberOfQuestions= {questions.length} index={index} />
          </>
        }

        {status === "finish" && <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch}/>} 

      </Main>
    </div>
  );
}

export default App;

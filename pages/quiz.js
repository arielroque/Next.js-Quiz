import React, { lazy, useState } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';


function addResult(result){
    setResults([...results,result]);
}

function ResultWidget({results}){
    return (
        <Widget>

            <Widget.Header>
                Tela de Resultado:

            </Widget.Header>

            <Widget.Content>
                <p>
                    Você acertou {results.reduce((actualSum,sumResult)=>{
                        const isAccept = actualSum === true;

                        if(isAccept){
                            return actualSum +1;
                        }
                        return sumResult;


                    },0)} perguntas
                </p>
                
                <ul>
                    {results.map((result,index)=>{
                        return <li key={`result ${index}`}>#{index + 1} Resultado: {result === true? 'Acertou' : 'Errou'}</li>
                    })}

                </ul>

            </Widget.Content>

        </Widget>
    )
}


function LoadingWidget() {
    return (
      <Widget>
        <Widget.Header>
          Carregando...
        </Widget.Header>
  
        <Widget.Content>
          [Desafio do Loading]
        </Widget.Content>
      </Widget>
    );
  }

  const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
  };

  function QuestionWidget({
      question,
      totalQuestions,
      questionIndex,
      onSubmit,
      addResult,
    }){

      const questionId = `question__${questionIndex}`;
      const [selectedAlternative, setSelectedAlternative] = useState();
      const [isQuestionSubmited,setIsQuestionSubmited] = useState(false);
      const isCorrect = selectedAlternative ===  question.answer;
      const hasAlternativeSelected = selectedAlternative!== undefined

      return <Widget>
      <Widget.Header>
      <h3>Pergunta {questionIndex} de {totalQuestions}</h3>
      </Widget.Header>

      <img
       alt="Descricao"
       style={{width:'100%',height:'150px',objectFit:'cover'}}
       src={question.image}>    
      </img>

      <Widget.Content>

          <h2>{question.title}</h2>
          <p>{question.description}</p>
        
          <form
           onSubmit={(event)=>{
               event.preventDefault();
               setIsQuestionSubmited(true);

               setTimeout(()=>{
                onSubmit();
                addResult(isCorrect);
                setIsQuestionSubmited(false);
                setSelectedAlternative(undefined)
               },3*1000);
           }}
          >
          {question.alternatives.map((alternative,alternativeIndex)=>{
              
              const alternativeId = `Alternative__${alternativeIndex}`;
              
              return (
                  <Widget.Topic
                  as="label"
                   key={alternativeId}
                   htmlFor={alternativeId}>
                      <input 
                      id={alternativeId}
                      name={questionId}
                      onChange= {()=> setSelectedAlternative(alternativeIndex)}
                      addResult = {addResult}
                      type="radio"
                      />
                       {alternative}  
                  </Widget.Topic>
              );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>

          {isQuestionSubmited &&isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}

          </form>


       </Widget.Content>
      </Widget>
  };


export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];
    const [results,setResults] = useState([true,false,true ]);
  
    // // [React chama de: Efeitos || Effects]
    // // React.useEffect
    // // atualizado === willUpdate
    // // morre === willUnmount

    React.useEffect(() => {
    setTimeout(() => {
     setScreenState(screenStates.QUIZ);
       }, 1 * 1000);
    }, []);
  
    function handleSubmitQuiz() {
      const nextQuestion = questionIndex + 1;
      if (nextQuestion < totalQuestions) {
        setCurrentQuestion(nextQuestion);
      } else {
        setScreenState(screenStates.RESULT);
      }
    }
  
    return (
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          
          {screenState === screenStates.QUIZ &&(
               <QuestionWidget 
               question={question} 
               totalQuestions={totalQuestions} 
               questionIndex={questionIndex}
               onSubmit={handleSubmitQuiz}
               addResult={addResult}
               />
          )}

          {screenState === screenStates.LOADING && <LoadingWidget/>}

          {screenState === screenStates.RESULT && <ResultWidget results={results} />}

        </QuizContainer>
      </QuizBackground>   
    );
  }
import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import GitHubCorner from '../src/components/GithubCorner'
import Footer from '../src/components/Footer'
import QuizBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo';
import Head from 'next/head';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondary};
`


 export const QuizContainer  = styled.div`
  width:100%;
  max-width:350px;
  padding-top:45px;
  margin:auto 10%;
  @media screen and (max-with:500px){
    margin:auto;
    padding:15px;
  }
 `


export default function Home() {
  return (
      <QuizBackground BackgroundImage={db.bg}>

      <Head>
        <title>AluraQuiz - Modelo Base</title>
      </Head>  

      <QuizContainer>

      <QuizLogo />

       <Widget>

         <Widget.Header>
           <h1>Quiz Power Rangers</h1>
           
         </Widget.Header>
         <Widget.Content>
         <p>Vamo simbora testar seus conhecimentos sobre os Rangers</p>
         </Widget.Content>

       </Widget>
       
       <Widget>

         <Widget.Header>
         <h1>Quizes</h1>
         </Widget.Header>

         <Widget.Content>
         <p>.....</p>
         </Widget.Content>

       </Widget>

       <Footer/>

      </QuizContainer>

      <GitHubCorner projectUrl="http://github.com"/>

      </QuizBackground>
      
  )
}

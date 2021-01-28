import styled from 'styled-components';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GithubCorner';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import {Router, useRouter} from 'next/router'
import { route } from 'next/dist/next-server/server/router';
import react from 'react';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const QuizContainer = styled.div`
  width:100%;
  max-width:350px;
  padding-top:45px;
  margin:auto 10%;
  @media screen and (max-with:500px){
    margin:auto;
    padding:15px;
  }
 `;

export default function Home() {

  const router = useRouter();
  const [name,setName] = React.useState("");

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
            <form onSubmit={function (event) {
              event.preventDefault();
    
             router.push(`/quiz?name=${name}`)

            }}>
            <input 
            onChange={(event)=>{
              console.log(event.target.value);
              setName(event.target.value)
            }}
            placeholder="Diz ai"/>
            <button type="submit" disabled={name.length === 0}>Jogar [seuNome]</button>
            </form>
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

        <Footer />

      </QuizContainer>

      <GitHubCorner projectUrl="http://github.com" />

    </QuizBackground>

  );
}

import styled from 'styled-components';import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GithubCorner';
import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import {Router, useRouter} from 'next/router'
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondary};
`;


export default function Home() {

  const router = useRouter();
  const [name,setName] = React.useState("");

  return (
    <QuizBackground backgroundImage={db.bg}>

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
            <Input
            name="UserName"
            onChange={(event)=>{
              console.log(event.target.value);
              setName(event.target.value)
            }}
            value={name}
            placeholder="Diz ai"/>
            <Button type="submit" disabled={name.length === 0}>Jogar {name}</Button>
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

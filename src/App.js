import './App.css';
import fishes from './data/fish';
import artifacts from './data/artifacts';
import bugs from './data/bugs';
import Checklist from './component/checklist';
import { useState } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

const Container = styled.div`
  padding: 0.313rem 0;
  box-sizing: border-box;
`

const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 1.563rem;
  font-size: 1rem;
`

const Tab = styled.div`
  padding: 0.313rem 0.625rem;
  background-color: lavender;
  border: solid 1px ${darken(0.2, 'lavender')};
  border-radius: 0.313rem;
  cursor: pointer;
  box-sizing: border-box;
` 

function App() {
  const [tab, setTab] = useState('Fish');
  const categories = ['Fish', 'Insects', 'Artifacts'];

  return (
    <Container className="App">
      <Tabs>
        { categories.map((name, index) => (
          <Tab key={index} onClick={() => setTab(name)}>{name}</Tab>
        ))}
      </Tabs>
      { tab === 'Fish' && <Checklist listItems={fishes} itemType={'fishes'}></Checklist> } 
      { tab === 'Insects' && <Checklist listItems={bugs} itemType={'bugs'}></Checklist> }
      { tab === 'Artifacts' && <Checklist listItems={artifacts} itemType={'artifacts'}></Checklist> } 
    </Container>
  );
}

export default App;

import React, { useState} from 'react';
import './style/main.css';
import Header from './components/Header';
import Today from './components/Today';
import Container from './components/Container';
import { cityContext } from './context';


function App() {
  const [citys,setCitys] = useState('Agapovka')
  return (
  <cityContext.Provider value={{
      citys,
      setCitys
    }}>
    <div className="App">
      <Container>
        <Header/>
        <Today/>
      </Container>
    </div>
  </cityContext.Provider>
  );
}

export default App;

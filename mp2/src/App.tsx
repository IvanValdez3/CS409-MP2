import './App.css';
import { useState } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';

function App() {

  const [userInput, setUserInput] = useState('');

  return (
    <div className="App">
      <header className="Search-header">
        <SearchBar userInput={userInput} setUserInput={setUserInput} />
      </header>
    </div>
  );
}


export default App;

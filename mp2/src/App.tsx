import './App.css';
import React, { useState } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import { ListView } from './Components/ListView/ListView';


function App() {
  //Now that I've worked on ListView and Spotify, there are more elements to store in the
  //start. That will control what's done later

  const [userInput, setUserInput] = useState('');

  return (
    <div className="App">
      <header className="Search-header">
        <SearchBar userInput={userInput} setUserInput={setUserInput} />
      </header>
      <main>
        <ListView userInput={userInput} />
      </main>
    </div>
  );
}


export default App;

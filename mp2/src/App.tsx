import './App.css';
import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './Components/SearchBar/SearchBar';
import { ListView } from './Components/ListView/ListView';
import { Gallery } from './Components/GalleryView/GalleryView';
import { SongDetails } from './Components/DetailView/DetailView';

function App() {
  //Now that I've worked on ListView and Spotify, there are more elements to store in the
  //start. That will control what's done later
  //Comment jsut to push
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current view from route
  const currentView = location.pathname === '/gallery' ? 'gallery' : 'list';

  return (
    <div className="App">
      <header className="Search-header">
        <SearchBar userInput={userInput} setUserInput={setUserInput} />
      </header>

      {/* I've decided to go with a toggle option for the view type */}
      <div className="view-toggle" style={{ 
        margin: "100px auto 20px", 
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: "15px",
        borderRadius: "8px",
        maxWidth: "400px"
      }}>

        <button
          onClick={() => navigate('/list')}
          style={{ 
            fontWeight: currentView === "list" ? "bold" : "normal",
            padding: "10px 20px",
            margin: "0 5px",
            cursor: "pointer",
            backgroundColor: currentView === "list" ? "#282c34" : "white",
            color: currentView === "list" ? "white" : "#282c34",
            border: "2px solid #282c34",
            borderRadius: "5px",
            fontSize: "16px"
          }}
        >
          List View
        </button>
        <button
          onClick={() => navigate('/gallery')}
          style={{ 
            fontWeight: currentView === "gallery" ? "bold" : "normal",
            padding: "10px 20px",
            margin: "0 5px",
            cursor: "pointer",
            backgroundColor: currentView === "gallery" ? "#282c34" : "white",
            color: currentView === "gallery" ? "white" : "#282c34",
            border: "2px solid #282c34",
            borderRadius: "5px",
            fontSize: "16px"
          }}
        >
          Gallery View
        </button>
      </div>

      <main>
        <Routes>
          <Route path="/" element={<ListView userInput={userInput} />} />
          <Route path="/list" element={<ListView userInput={userInput} />} />
          <Route path="/gallery" element={<Gallery userInput={userInput} />} />
          <Route path="/details/:id" element={<SongDetails items={[]} currentSong={0} onClose={() => navigate(-1)} />} />
        </Routes>
      </main>
    </div>
  );
}


export default App;

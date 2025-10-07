import './SearchBar.css';


function SearchBar({userInput, setUserInput}) {

    //Most important is handling text input
    const input = (event) => {
        setUserInput(event.target.value);
    };

  return (
    <div className="SearchBar">
      <h1 className="Search-title">Music Muse</h1>

      <div className="SearchBar-controls">
        <button className="Search-button" type="submit">Search</button>
        <input className="Search-input" type="text" placeholder="Search..." value={userInput} onChange={input} />
      </div>
    </div>
  );
}

export default SearchBar;
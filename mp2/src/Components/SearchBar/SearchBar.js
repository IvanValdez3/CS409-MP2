import './SearchBar.css';


function SearchBar({userInput, setUserInput}) {

    //Most important is handling text input
    const input = (event) => {
        setUserInput(event.target.value);
    };

  return (
    <div className="SearchBar">
      <input className="Search-input" type="text" placeholder="Search..." value={userInput} onChange={input} />
      <button className="Search-button" type="submit">Search</button>
    </div>
  );
}

export default SearchBar;
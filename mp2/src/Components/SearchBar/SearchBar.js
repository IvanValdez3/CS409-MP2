import './SearchBar.css';


function SearchBar() {
  return (
    <div className="SearchBar">
      <input className="Search-input"type="text" placeholder="Search..." />
      <button className="Search-button" type="submit">Search</button>
    </div>
  );
}

export default SearchBar;
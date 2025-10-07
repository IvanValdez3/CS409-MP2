//Helpful tutorial https://www.youtube.com/watch?v=sWVgMcz8Q44

//Game plan
//1. use the user input
//2. update the query
//3. useeffect to fetch to spotify api
//4.update songs
//5. sort
//6. Allow for clicking a song

import React, {useState} from "react";
import useSpotifySearch from "../SpotifyCall/SpotifySearch";
import "./ListView.css"
import { useNavigate } from "react-router-dom";

//Some things to consider and keep track with assignment requirements
//1. Songs, Sorting , and Order

export function ListView({userInput}) {
    const {songs, loading} = useSpotifySearch(userInput);
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc"); 
    const navigate = useNavigate();

    //Spotify API returns info like this
    //song.name
    //song.artists[0].name
    //song.album.images[0].url
    //song.id

    // Sort songs based on user selection
    const sortedSongs = [...songs].sort((a, b) => {
        // Map sortBy to actual song properties
        let aVal, bVal;
        if (sortBy === "title") {
            aVal = a.name;
            bVal = b.name;
        } else if (sortBy === "artist") {
            aVal = a.artists[0].name;
            bVal = b.artists[0].name;
        }

        //Considering users can simply use all caps, here's a safety check
        if(typeof aVal === "string") {
            aVal = aVal.toLowerCase();
        }
        if(typeof bVal === "string") {
            bVal = bVal.toLowerCase();
        }

        if (sortOrder === "asc") {
            if (aVal < bVal) {
                return -1;
            } else if (aVal > bVal) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (aVal > bVal) {
                return -1;
            } else if (aVal < bVal) {
                return 1;
            } else {
                return 0;
            }
        }
    });

    return (
        <div className="ListView">
            <h2>Your Favorite Songs</h2>

            {/*Let's add the sorting and order options*/}
            <div className="ListView-sortOrder">
                <label>
                    Sort by:
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="artist">Artist</option>
                    </select>
                </label>

                <label>
                    Sort order:
                    <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>

            {loading && <p>Loading...</p>}
            {!loading && sortedSongs.length === 0 && <p>No results found</p>}

            {/*https://react.dev/learn/rendering-lists -- for future help when debugging*/}
            {sortedSongs.map(song => (
                <div key={song.id} className="list-item">
                    <p>{song.name}</p>
                    <p>{song.artists[0].name}</p>
                    <img src={song.album.images[0].url} alt={song.name} />
                </div>
            ))}
        </div>
    );
}
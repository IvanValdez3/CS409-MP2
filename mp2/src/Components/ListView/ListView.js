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

//Some things to consider and keep track with assignment requirements
//1. Songs, Sorting , and Order

export function ListView({userInput}) {
    const {songs, loading} = useSpotifySearch(userInput);
    const [sortBy, setSortBy] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc"); 

    // Sort songs based on user selection
    const sortedSongs = [...songs].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
            if (aValue < bValue) {
                return -1;
            }
            return 1;
        } else {
            if (aValue > bValue) {
                return -1;
            }
            return 1;
        }
    });

    return (
        <div className="ListView">
            <h2>Your Favorite Songs</h2>

            {/*Some conditions we have to display first*/}
            {loading && <p>Loading...</p>}
            {!loading && sortedSongs.length === 0 && <p>No results found</p>}

            {/*https://react.dev/learn/rendering-lists -- for future help when debugging*/}
            {sortedSongs.map(song => (
                <div key={song.id} className="list-item">
                    <p>{song.title}</p>
                    <p>{song.artist}</p>
                </div>
            ))}
        </div>
    );
}
import {useState, useEffect} from 'react';

//https://developer.spotify.com/documentation/web-api
//https://www.youtube.com/watch?v=XsP9HDAOZL8

const clientId = "da3c0e508b52446da584193757b06fa1";
const clientSecret = "a6cf52dc9d3d4e66943c4029defa727c";

//https://developer.spotify.com/documentation/web-api/concepts/access-token
export async function getToken() {
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const wait = await result.json();
    return wait.access_token;
}

export async function SpotifySearch({userInput, token}) {
    if(userInput === "") return [];

    try {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${userInput}&type=track&limit=10`, { 
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const data = await result.json();
        return data.tracks.items;
    } catch (error) {
        console.error("Error fetching Spotify search results:", error);
        return [];
    }
}

export function useSpotifySearch(userInput) {
    const [songs, setSongs] = useState([]);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);  

    //After integrating spotify api, now we can use them to get information
    //For songs

    //First we will get my token
    useEffect(() => {
        getToken().then(token => {
            setToken(token);
        })
    }, []);

    //next we will search for songs
    useEffect(() => {
        if (userInput === "" || token === "") return;

        setLoading(true);
        SpotifySearch({ userInput, token }).then(setSongs).finally(() => {
            setLoading(false);
        });
    }, [userInput, token]);

    //Lastly return the songs that were found or if it's loading
    return { songs, loading };
}

export default useSpotifySearch;
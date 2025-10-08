import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
//import useSpotifySearch from "../SpotifyCall/SpotifySearch";
import "./DetailView.css"

export function SongDetails() {
    //if (!items || items.length === 0) {
    //    return null;
    //}

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();


    //List of songs
    const { items = [] } = location.state || {};
    const song = items.findIndex(item => item.id === id);

    //The whole point of this is to help with one of the requirements
    //which is "view should have previous and next buttons"
    const [currentSong, setCurrentSong] = useState(song >= 0 ? song : 0);   

    const songDetails = items[currentSong];
    if(!items.length) {
        return <div>No songs available</div>;
    }

    if (!songDetails) {
        //Honestlt have an idea that if a song is not found
        //It can be so much better
        return <div>Song not found</div>;
    }

    useEffect(() => {
        if (songDetails) {
            document.title = `${songDetails.name} - ${songDetails.artists[0].name}`;
        }
    }, [songDetails]);

    const durationMin = (songDetails.duration_ms / 60000).toFixed(2);
    //Now we handle previous and next buttons
    const goBack = () => {
        if(currentSong === 0) {
            setCurrentSong(items.length - 1);
            navigate(`/details/${items[items.length - 1].id}`, { state: { items } });
        } else {
            setCurrentSong(currentSong - 1);
            navigate(`/details/${items[currentSong - 1].id}`, { state: { items } });
        }
    };

    const goForward = () => {
       if (currentSong === items.length - 1) {
            setCurrentSong(0);
            navigate(`/details/${items[0].id}`, { state: { items } });
        } else {
            setCurrentSong(currentSong + 1);
            navigate(`/details/${items[currentSong + 1].id}`, { state: { items } });
       }
    };  

    //Spotify API allows us to get
    //1 Song Name
    //2 Artist Name
    //3 Album Art
    //4 Release Date
    //5 Duration
    //6 Preview
    //...

    return (
        <div className="DetailView">
            <div className="carousel">
                <button className="arrow-left" onClick={goBack}>
                    &lt;
                </button>
                {/* Considering that this is like a carousel we need to fill info*/}
                <button className="arrow-right" onClick={goForward}>
                    &gt;
                </button>
            </div>

            <div className="Content">
                <div className="Info">
                    <h2 className="Song-title">{songDetails.name}</h2>
                    <h3 className="Song-artist">by {songDetails.artists?.[0].name || "Artist not found"}</h3>
                    <p>Album: {songDetails.album?.name || "Album not found"}</p>
                    <p>Release Date: {songDetails.album?.release_date || "Release date not found"}</p>
                    <p>Duration: {durationMin} min </p>
                    <a href={songDetails.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="link">
                        Listen on Spotify
                    </a>
                </div>

                {songDetails.album?.images?.[0]?.url && (
                    <div className="AlbumArt">
                        <img src={songDetails.album.images[0].url} alt={`${songDetails.name} album art`} />
                    </div>
                )}
            </div>
        </div>
    );
}
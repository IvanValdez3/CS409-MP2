import React, { useState, useEffect, use } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useSpotifySearch from "../SpotifyCall/SpotifySearch";
import "./DetailView.css"

export function songDetails({ items }) {
    if (!items || items.length === 0) {
        return null;
    }

    const { id } = useParams();
    const song = items.find(item => item.id === id);
    const navigate = useNavigate();
    const location = useLocation();

    //List of songs
    const { items } = location.state || { items: [] };

    //The whole point of this is to help with one of the requirements
    //which is "view should have previous and next buttons"
    const [currentSong, setCurrentSong] = useState(song);   

    const songDetails = items[currentSong];
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
    
    //Now we handle previous and next buttons
    const goBack = () => {
        let nextSong;

        if (currentSong > 0) {
            nextSong = currentSong - 1;
        } else {
            nextSong = items.length - 1;
        }

        setCurrentSong(nextSong);
        navigate(`/details/${items[nextSong].id}`)
    };

    const goForward = () => {
        let nextSong;

        if (currentSong < items.length - 1) {
            nextSong = currentSong + 1;
        } else {
            nextSong = 0;
        }

        setCurrentSong(nextSong)
        navigate(`/details/${items[nextSong].id}`);
    };  

    if (!songDetails) {
        return <div>Song not found</div>;
    }

    return (
        <div className="DetailView">
            <button className="arrow-left" onClick={goBack}>&lt;</button>
            {/* Considering that this is like a carousel we need to fill info*/}
            <div className="carousel">
                <h2>{songDetails.name || songDetails.title}</h2>
                <img src={songDetails.albumArt} alt={songDetails.title} />
                <h2>{songDetails.title}</h2>
                <p>{songDetails.artist}</p>
            </div>
            <button className="arrow-right" onClick={goForward}>&gt;</button>
        </div>
    );
}
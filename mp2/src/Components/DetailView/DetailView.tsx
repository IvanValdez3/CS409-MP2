import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
//import useSpotifySearch from "../SpotifyCall/SpotifySearch";
import "./DetailView.css"

interface Song {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
        images: Array<{ url: string }>;
        name: string;
        release_date: string;
    };
    duration_ms: number;
    external_urls: {
        spotify: string;
    };
}

interface SongDetailsProps {
    items?: Song[];
    currentSong?: number;
    onClose?: () => void;
}

export function SongDetails({ items: propItems, currentSong: propCurrentSong, onClose }: SongDetailsProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const { songs = propItems || [], currentIndex = propCurrentSong || 0 } = location.state || {};
    
    const [song, setSong] = useState<number>(currentIndex);
    
    if (!songs || songs.length === 0) {
        return (
            <div className="DetailView">
                <div className="carousel">
                    <button className="close-button" onClick={() => navigate(-1)}>X</button>
                    <div className="Content">
                        <p>No song details available</p>
                    </div>
                </div>
            </div>
        );
    }
    
    const songDetails = songs[song];

    //const { id } = useParams();
    //const navigate = useNavigate();
    //const location = useLocation();


    //List of songs
    //const { items = [] } = location.state || {};
    //const song = items.findIndex(item => item.id === id);

    //The whole point of this is to help with one of the requirements
    //which is "view should have previous and next buttons"
    //const [currentSong, setCurrentSong] = useState(song >= 0 ? song : 0);   

    //const songDetails = items[currentSong];
    //if(!items.length) {
    //    return <div>No songs available</div>;
    //}

    //if (!songDetails) {
    //    //Honestlt have an idea that if a song is not found
        //It can be so much better
    //    return <div>Song not found</div>;
    //}

    /*useEffect(() => {
        if (songDetails) {
            document.title = `${songDetails.name} - ${songDetails.artists[0].name}`;
        }
    }, [songDetails]);*/

    const durationMin = (songDetails.duration_ms / 60000).toFixed(2);
    //Now we handle previous and next buttons
    const goBack = () => {
        const newIndex = song === 0 ? songs.length - 1 : song - 1;
        setSong(newIndex);
        navigate(`/details/${songs[newIndex].id}`, { 
            state: { songs, currentIndex: newIndex },
            replace: true 
        });
    };

    const goForward = () => {
        const newIndex = song === songs.length - 1 ? 0 : song + 1;
        setSong(newIndex);
        navigate(`/details/${songs[newIndex].id}`, { 
            state: { songs, currentIndex: newIndex },
            replace: true 
        });
    };
    
    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate(-1);
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
                <button className="close-button" onClick={handleClose}>X</button>

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

                <div className="carousel">
                    <button className="arrow-left" onClick={goBack}>
                        &lt;
                    </button>
                    <button className="arrow-right" onClick={goForward}>
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}

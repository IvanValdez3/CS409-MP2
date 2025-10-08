import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useSpotifySearch from "../SpotifyCall/SpotifySearch";
import "./GalleryView.css";
import { getToken } from "../SpotifyCall/SpotifySearch";

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

interface GalleryViewProps {
    userInput: string;
}

export function Gallery({userInput}: GalleryViewProps) {
    const {songs: searchSongs, loading: searchLoading} = useSpotifySearch(userInput);
    const [moodFilter, setMoodFilter] = useState<string>("all");
    const [randomSongs, setRandomSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadRandomSongs = async () => {
            setLoading(true);
            try {
                const token = await getToken();
                const queries = ['pop', 'rock', 'jazz', 'electronic', 'indie'];
                const randomQuery = queries[Math.floor(Math.random() * queries.length)];
                
                const result = await fetch(`https://api.spotify.com/v1/search?q=genre:${randomQuery}&type=track&limit=20`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });
                const data = await result.json();
                setRandomSongs(data.tracks.items);
            } catch (error) {
                console.error("Error fetching random songs:", error);
            }
            setLoading(false);
        };

        if (!userInput) {
            loadRandomSongs();
        }
    }, [userInput]);

    const displaySongs = userInput ? searchSongs : randomSongs;

    const filteredSongs: Song[] = moodFilter === "all" 
        ? displaySongs 
        : [...displaySongs].sort((a: Song, b: Song) => {
            const getMatchScore = (song: Song): number => {
                const songName = song.name.toLowerCase();
                const artistName = song.artists[0]?.name.toLowerCase() || "";
                const albumName = song.album?.name.toLowerCase() || "";
                const searchText = `${songName} ${artistName} ${albumName}`;
                
                let score = 0;
                
                //I'm  not giving valence so it's hard to determine the type of mood a song is 
                if (moodFilter === "happy") {
                    const keywords = ["happy", "joy", "love", "dance", "party", "fun", "smile", "celebrate", "shine", "bright"];
                    keywords.forEach(keyword => {
                        if (searchText.includes(keyword)) score += 10;
                    });
                } else if (moodFilter === "sad") {
                    const keywords = ["sad", "tear", "blue", "lonely", "heartbreak", "cry", "miss", "lost", "goodbye", "rain"];
                    keywords.forEach(keyword => {
                        if (searchText.includes(keyword)) score += 10;
                    });
                } else if (moodFilter === "energetic") {
                    const keywords = ["rock", "energy", "power", "wild", "loud", "hard", "fast", "fire", "electric", "jump"];
                    keywords.forEach(keyword => {
                        if (searchText.includes(keyword)) score += 10;
                    });
                } else if (moodFilter === "chill") {
                    const keywords = ["chill", "relax", "calm", "peaceful", "smooth", "easy", "slow", "soft", "dream", "night"];
                    keywords.forEach(keyword => {
                        if (searchText.includes(keyword)) score += 10;
                    });
                }
                
                return score;
            };
            
            return getMatchScore(b) - getMatchScore(a);
        });

    return (
        <div className="GalleryView">
            <div className="Gallery-filters">
                <label style={{ marginRight: "10px", fontWeight: "bold" }}>Filter by Mood:</label>
                <select 
                    value={moodFilter} 
                    onChange={(e) => setMoodFilter(e.target.value)}
                    style={{
                        padding: "8px 15px",
                        fontSize: "14px",
                        borderRadius: "5px",
                        border: "2px solid #282c34",
                        cursor: "pointer"
                    }}
                >
                    <option value="all">All</option>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="energetic">Energetic</option>
                    <option value="chill">Chill</option>
                </select>
            </div>

            {(loading || searchLoading) && <p>Loading...</p>}
            {!loading && !searchLoading && filteredSongs.length === 0 && userInput && <p>No results found. Try a different search or mood filter!</p>}
            {!loading && !searchLoading && displaySongs.length === 0 && !userInput && <p>Loading random songs...</p>}
            <div className="Gallery-grid">
                {filteredSongs.map((song: Song, index: number) => (
                    <img 
                        key={song.id} 
                        src={song.album.images[0]?.url} 
                        alt={song.name} 
                        onClick={() => {
                            navigate(`/details/${song.id}`, { 
                                state: { songs: filteredSongs, currentIndex: index } 
                            });
                        }}
                        title={`${song.name} - ${song.artists[0]?.name}`}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </div>
        </div>
    );
}
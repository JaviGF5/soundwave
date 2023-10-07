import React,{ useState, createContext } from 'react';


export const PlayerMusicContext = createContext({});

export function PlayerProvider(props) {

    const [song, setSong] = useState(null);
    const [songImage, setSongImage] = useState(null);
    const [playing, setPlaying] = useState(null);
    const [volume, setVolume] = useState(1);

    // Play Song Control
    const startPlay = (songData, songImageData) => {
        setSong(songData);
        setSongImage(songImageData);
        setPlaying(true);
    }

    const pause = () => setPlaying(false);

    const resume = () => setPlaying(true);

    const data = {
        startPlay,
        pause,
        resume,
        song,
        songImage,
        playing,
        setVolume,
        volume,
    };

    return (
        <PlayerMusicContext.Provider value={ data }> 
            { props.children } 
        </PlayerMusicContext.Provider>
    )
}

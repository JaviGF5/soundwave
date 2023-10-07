import React, { useState, useEffect } from 'react';
import { size, map } from 'lodash';
import { usePlayer } from '../../../hooks';
import styles from './ListSongs.module.css';
import loaderStyles from '../../../styles/components/loader.module.css';
import { playerIcon, pauseIcon } from '../../../assets';


export function ListSongs(props) {

    const { startPlay } = usePlayer();
    const onPlay = (item) => {
        startPlay(item, props.songImage);
    }

    const playing = true;

    // Loader Animation
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
        setLoading(false);
        }, 2700);
    }, []);

    if (size(props.songs) === 0) {
        return (
        <>
            { loading ? 
            ( <div className={ loaderStyles.loadingIcon } /> ) : 
            ( <i className={ loaderStyles.text }> No hay canciones por el momento </i> ) 
            }
        </>
        )
    };


    return (
      <ul className={ styles.content }>

            <li className={ styles.songTitle }> Título </li>
            {
                map(props.songs, (song, index) => (
                    <li 
                        className={ styles.songContent } 
                        key={ song.id } 
                        onClick={ () => onPlay(song) }
                    >
                        <img 
                            className={ styles.playerIcon } 
                            src={ playing ? playerIcon : pauseIcon } 
                            alt="Reproducir Música"
                        /> 
                        <span className={ styles.numero }> { index + 1 } </span>
                        <span > { song.name } </span>
                    </li>
                ))
            }
            
        </ul>
    )
}

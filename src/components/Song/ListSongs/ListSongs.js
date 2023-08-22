import React, { useState, useEffect } from 'react';
import { size, map } from 'lodash';
import styles from './ListSongs.module.css';
import loaderStyles from '../../../styles/components/loader.module.css';
import { playerIcon, pauseIcon } from '../../../assets';

import { usePlayer } from '../../../hooks';

export function ListSongs(props) {

    const { startPlay } = usePlayer();

    const onPlay = (item) => {
        startPlay(item, props.songImage);
    }

    const playing = true;

    // Animación de carga
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
            ( <div className={ loaderStyles.loadingIcon }></div> ) : 
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
                        key={ song.id } 
                        className={ styles.songContent } 
                        onClick={ () => onPlay(song) }
                    >
                        <img 
                            src={ playing ? playerIcon : pauseIcon } 
                            className={ styles.playerIcon } 
                            alt="Reproducir Música"
                        /> 
                        <span className={ styles.numero }> { index + 1 } </span>
                        <span className={ styles.songName }>{ song.name }</span>
                    </li>
                ))
            }
            
        </ul>
    )
}

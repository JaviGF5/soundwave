import React from 'react';
import styles from './Footer.module.css';
import { Player } from '../../Shared';

import { usePlayer } from '../../../hooks';


export function Footer() {

  const { song, songImage, volume, setVolume } = usePlayer();
  


  return (
    <div className={ styles.content }>
      
        <div className={ styles.songData }>

          { songImage &&
            <img src={ songImage } className={ styles.miniature } alt="Imagen Canción" />
          }
          { song &&
            <p className={ styles.songName }> { song.name } </p>
          }
          
        </div>
        
        <div className={ styles.player }>
          <Player />
        </div>
      
        <div className={ styles.volumeContent }>
          <input
            className={ styles.volume }
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={ volume }
            onChange={ (event) => setVolume(Number(event.target.value)) } 
          />
        </div>

    </div>
  )
}

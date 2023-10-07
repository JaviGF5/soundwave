import React from 'react';
import { Player } from '../../Shared';
import { usePlayer } from '../../../hooks';
import styles from './Footer.module.css';


export function Footer() {

  const { song, songImage } = usePlayer();
  
  
  return (
    <div className={ styles.content }>
      
      <div className={ styles.songData }>

        { songImage &&
          <img 
            className={ styles.miniature } 
            src={ songImage } 
            alt="Imagen Canción" 
          />
        }
        { song &&
          <p> { song.name } </p>
        }

      </div>
      
      <div className={ styles.player }>
        <Player />
      </div>

    </div>
  )
}

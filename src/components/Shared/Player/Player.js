import React, { useState } from 'react';
import styles from './Player.module.css';
import { pauseIcon, playerIcon } from '../../../assets';
import { usePlayer } from '../../../hooks';
import ReactPlayer from 'react-player';


export function Player() {

  const { song, playing, pause, resume, volume } = usePlayer();

  const [totalSeconds, setTotalSeconds] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  const onProgress = (data) => {
    setTotalSeconds(data.loadedSeconds);
    setCurrentSeconds(data.playedSeconds);

  }

  return (
    <div className={ styles.content }>

      <img 
        src={ playing ? pauseIcon : playerIcon } 
        className={ styles.playerIcon } 
        alt="Reproducir Música" 
        onClick={ playing ? pause : resume }
      />

      <progress 
        className={ styles.progressBar } 
        max={totalSeconds} 
        value={currentSeconds}
      />

      <ReactPlayer 
        url={ song?.file } 
        playing={ playing } 
        height={0} 
        width={0} 
        volume={ volume }
        onProgress={ onProgress }
      />

    </div>
  )
}

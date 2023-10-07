import React from 'react';
import { usePlayer } from '../../../hooks';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';


export function Player() {

  const { song } = usePlayer();

  
  return (
      <AudioPlayer
        src={ song?.file }
        customAdditionalControls={[]}
        showJumpControls={true}
        showSkipControls={false}
      />    
  )
}

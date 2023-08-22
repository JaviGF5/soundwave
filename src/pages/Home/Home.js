import React, { useState, useEffect } from 'react';
import { Auth, Album, Artist, Song } from "../../api";
import { Slider } from '../../components/Shared';
import styles from './Home.module.css';
import { logoIconWhite } from '../../assets';

import { usePlayer } from '../../hooks';


const artistControl = new Artist();
const authControl = new Auth();
const albumControl = new Album();
const songControl = new Song();



export function Home() {


  // Obtener últimos artistas
  const [lastArtists, setLastArtists ] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await artistControl.getLastsArtists(9);
        setLastArtists(response);
      } catch (error) {
        console.error(error);
      }
    })()
  }, []);

  // Obtener últimos albumes
  const [lastAlbums, setLastAlbums ] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumControl.getLastsAlbums(10);
        setLastAlbums(response);
      } catch (error) {
        console.error(error);
      }
    })()
  }, []);


  // Obtener últimos canciones
  const [lastSongs, setLastSongs ] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await songControl.gestLastSongs(11);

        // Obtener imagen del album para la canción
        let data = [];
        for await (const item of response) {
          const song = item;
          const resultAlbum = await albumControl.getAlbum(item.album);
          song.image = resultAlbum.image;
          data.push(song);
        }
        setLastSongs(data);
      } catch (error) {
        console.error(error);
      }
    })()
  }, []);


  return (
    <div className={ styles.content }>
      
      
       <h1>Home</h1>

        <div className={ styles.contentItem }>
          <img src={ logoIconWhite } alt="Logo Soundwave" className={ styles.logo }/>
          <h3> Feel the vibes. </h3>
        </div>
        

        <span className={ styles.secctionList }> Últimos Artistas </span>
        { lastArtists && 
          <Slider data={ lastArtists } basePath="artists" />
        }

        <span className={ styles.secctionList }> Últimos Albumes </span>
        { lastAlbums && 
          <Slider data={ lastAlbums } basePath="albums" />
        }

        <span className={ styles.secctionList }> Últimas Canciones </span>
        { lastSongs && 
          <Slider data={ lastSongs } basePath="blockRoute" />
        }
        
        <div className={ styles.contentItem}>
          <button className={ styles.button } onClick={ authControl.logout }> Cerrar Sesión </button>
        </div>

    </div>
  )
}

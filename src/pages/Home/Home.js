import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { Auth, Album, Artist, Song } from "../../api";
import { Slider } from '../../components/Shared';
import styles from './Home.module.css';
import { logoIconWhite, albumIcon } from '../../assets';


const artistControl = new Artist();
const authControl = new Auth();
const albumControl = new Album();
const songControl = new Song();

export function Home() {

  // Get Last Artists
  const [lastArtists, setLastArtists ] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await artistControl.getLastsArtists(10);
        setLastArtists(response);
      } catch (error) {
        console.error(error);
      }
    })()
  }, []);


  // Get Last Albums
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


  // Get Last Songs
  const [lastSongs, setLastSongs ] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await songControl.gestLastSongs(10);
        // Obtener imagen del albúm para el slider de canciones
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
      
      <div className={ styles.contentItem }>
        <img 
          className={ styles.logo } 
          src={ logoIconWhite } 
          alt="Logo Soundwave" 
        />
        <h3> Feel the vibes. </h3>
      </div>    

      <span className={ styles.secctionTitle }> Últimas Canciones </span>
      { lastSongs && 
        <Slider data={ lastSongs } basePath="blockRoute" />
      }  

      <span className={ styles.secctionTitle }> Nuevos Proyectos </span>
      <div className={ styles.gridContent }>
        {
          map(lastAlbums, (album) => (
            <Link 
              className={ styles.gridItem } 
              key={ album.id } 
              to={ `/albums/${ album.id }` }  
            > 
              <div className={ styles.gridImage } style={{ backgroundImage: `url(${ album.image })` }} />
              <div className={ styles.nameGrid }>
                <img 
                  className={ styles.iconGrid } 
                  src={ albumIcon } 
                  alt='Álbum' 
                />
                <p> { album.name } </p>
              </div>   
            </Link>
          ))
        }
      </div> 

      <span className={ styles.secctionTitle }> Artistas Recientes </span>
      <div className={ styles.gridContent }>
        {
          map(lastArtists, (item) => (
            <Link 
              className={ styles.gridItem } 
              key={ item.id } 
              to={`/artists/${ item.id }`}
            > 
              <div className={ styles.gridImage } style={{ backgroundImage: `url(${ item.image })` }} />
              <div className={ styles.nameGrid }>
                <p> { item.name } </p>
              </div> 
            </Link>
          ))
        }
      </div> 

      <div className={ styles.contentItem }>
        <button className={ styles.button } onClick={ authControl.logout } /> 
      </div>

    </div>
  )
}

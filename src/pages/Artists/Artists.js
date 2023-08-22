import React, { useEffect, useState } from 'react';
import { Artist } from '../../api'; 
import styles from './Artists.module.css';
import { ListArtists } from '../../components/Artist';


const artistControl = new Artist();

export function Artists() {

  const [artists, setArtists] = useState([]);

  // Cargar artistas
  useEffect(() => {
    (async () => {
      try {
        const response = await artistControl.obtainAll();
        setArtists(response);
      } catch (error) {
        console.log(error);
      }
    }) ()
  }, []);
  
  return (
    <div className={ styles.content }>

      <h1>Artistas</h1>
      <ListArtists artists={ artists } />
      
    </div>
  )
}

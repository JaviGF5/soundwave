import React, { useEffect, useState } from 'react';
import { Artist } from '../../api'; 
import styles from './Artists.module.css';
import { ListArtists } from '../../components/Artist';


const artistControl = new Artist();

export function Artists() {

  // Load Artists
  const [artists, setArtists] = useState([]);

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

      <h2 className={ styles.title }> Artistas </h2>
      <ListArtists artists={ artists } />
      
    </div>
  )
}

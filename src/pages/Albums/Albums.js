import React, { useState, useEffect } from 'react';
import { Album } from '../../api';
import styles from './Albums.module.css';
import { ListAlbums } from '../../components/Album';


const albumControl = new Album();

export function Albums() {

  // Load Albums
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumControl.obtainAll();
        setAlbums(response);
      } catch (error) {
        console.log(error);
      }
    }) ()
  }, []);


  return (
    <div className={ styles.content }>
      
      <h2 className={ styles.title }> Albumes </h2>
      <ListAlbums albums={ albums }/>
      
    </div>
  )
}

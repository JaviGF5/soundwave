import React, { useState, useEffect } from 'react';
import styles from './Album.module.css';
import { Album as AlbumControl, Song } from '../../api';
import { useParams } from 'react-router-dom';
import { InfoAlbum } from '../../components/Album';
import { ListSongs } from '../../components/Song';


const albumControl = new AlbumControl();
const songControl = new Song();

export function Album() {
 
  const { id } = useParams();

  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState(null);
   
  useEffect(() => {
    (async () => {
      try {
        const response = await albumControl.getAlbum(id);
        setAlbum(response);
      } catch (error) {
        console.log(error);
      }
    }) ()
  }, [id]);
  
  // Cargar las canciones del albúm
  useEffect(() => {
    (async () => {
      try {
        const response = await songControl.obtainAllToAlbum(id);
        setSongs(response);
      } catch (error) {
        console.log(error);
      }
    }) ()
  }, [id]);



  if (!album) return null;
  if (!songs) return null;

  return (
    <div className={ styles.content }> 
      <InfoAlbum album={ album } />
      <ListSongs songs={ songs } songImage={ album.image } />
    </div>
  )
}

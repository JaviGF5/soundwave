import React, { useState, useEffect } from 'react';
import styles from './Artist.module.css';
import { useParams } from 'react-router-dom';
import { Artist as ArtistControl, Album, Song } from '../../api';
import { HeaderArtist } from '../../components/Artist';
import { Slider } from '../../components/Shared';
import { map } from 'lodash';
import { ListSongs } from '../../components/Song';


const artistControl = new ArtistControl();
const albumControl = new Album();
const songControl = new Song();

export function Artist(props) {

  // Get Artist Data
  const [artist, setArtist] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await artistControl.getArtist(id);
        setArtist(response);
      } catch (error) {
        console.error(error);
      }
    }) ()
  }, [id]);
  
  // Get Artist's Albums
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
   (async () => {
      try {
        const response = await albumControl.getAlbumToArtist(id);
        setAlbums(response);
      } catch (error) {
        console.error(error);
      }
    }) ()
  }, [id]);


  // Get Artist's Songs
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    if (albums) {
      (async () => {
        try {
          let data = [];
          for await (const item of albums) {
            const result = await songControl.obtainAllToAlbum(item.id);
            // Add the Album Image to the Song
            const dataAdd = map(result, (dataSong) => ({
              ...dataSong,
              image: item.image
            }))
            data.push(...dataAdd);
          }
          setSongs(data);
        } catch (error) {
          console.error(error);
        }
      })()
    }
  }, [albums])
  
  if (!artist) return null;


  return (
    <>

      <HeaderArtist image={ artist.image } name={ artist.name } />

      <div className={ styles.content }>

        <span className={ styles.secctionList }> Albumes </span>

        <Slider data={ albums } basePath="albums"/> 

        <span className={ styles.secctionList }> Canciones </span>

        <ListSongs songs={ songs }/>

      </div>

    </>
  )
};

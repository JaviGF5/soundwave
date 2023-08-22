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

  // Obtener datos del artista
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
  
  // Obtener albumes del artista
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


  // Obtener canciones del artista
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    if (albums) {
      (async () => {
        try {
          let data = [];
          // Petición a la base de datos, await por el tiemp ode espera
          for await (const item of albums) {
            // Obtengo el ID para poder extraer el resto de datos
            const result = await songControl.obtainAllToAlbum(item.id);

            const dataAdd = map(result, (dataSong) => ({
              // Agregar a la canción la imagen del albúm con el que está relacionado
              ...dataSong,
              image: item.image
            }))
            // Añadimos al objeto lo extraído (imagen del albúm)
            data.push(...dataAdd);
          }
          // Pasamos al array data los datos
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

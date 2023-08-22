import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { map, size } from 'lodash';
import styles from './ListAlbums.module.css';
import loaderStyles from '../../../styles/components/loader.module.css';
import { albumIcon } from '../../../assets';

export function ListAlbums(props) {

  // Animación de carga
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => {
      setLoading(false);
      }, 2700);
  }, []);

  if (size(props.albums) === 0) {
    return (
      <>
        { loading ? 
          ( <div className={ loaderStyles.loadingIcon }></div> ) : 
          ( <i className={ loaderStyles.text }> Cargando... </i> )  
        }
      </>
    )
  };

  return (
    <div className={ styles.gridContent }>
      {
        map(props.albums, (album) => (
            <Link  className={ styles.album } key={ album.id } to={`/albums/${ album.id }`}  > 
                <div className={ styles.photo } style={ {backgroundImage: `url(${ album.image })`} } />
                <div className={ styles.nameContent }>
                  <img src={ albumIcon } alt='Álbum' className={ styles.icon }/>
                  <p>{ album.name }</p>
                </div>
                
            </Link>
        ))
      }
    </div> 
  )
}

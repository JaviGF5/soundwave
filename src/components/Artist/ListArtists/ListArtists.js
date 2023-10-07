import React, { useState, useEffect } from 'react';
import { map, size } from 'lodash';
import { Link } from 'react-router-dom';
import styles from './ListArtists.module.css';
import loaderStyles from '../../../styles/components/loader.module.css';


export function ListArtists(props) {

  // Loader Animation
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2700);
  }, []);

  if (size(props.artists) === 0) {
    return (
      <>
        { loading ? 
          ( <div className={ loaderStyles.loadingIcon}></div> ) : 
          ( <i className={ loaderStyles.text }> Cargando... </i> ) 
        }
      </>
    )
  };


  return (
    <div className={ styles.content }>
      {
        props.artists.slice(0, 80).map( (artist) => (
          <Link  
            className={ styles.artist } 
            key={ artist.id } 
            to={`/artists/${ artist.id }`}  
          > 
            <div className={ styles.image } style={{ backgroundImage: `url(${ artist.image })` }} />
            <p>{ artist.name }</p>
          </Link>
        ))
      }
    </div>    
  )
}

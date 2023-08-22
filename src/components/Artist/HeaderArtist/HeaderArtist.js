import React from 'react';
import styles from './HeaderArtist.module.css';


export function HeaderArtist(props) {

    // const { image, name } = props;

    return (
      <div  className={ styles.content }>

          <div className={ styles.banner } style={ {backgroundImage: `url(${props.image})`} }>
            
            <h2 className={ styles.name }> { props.name } </h2>
            <div className={ styles.filter }></div>
            
          </div> 

      </div>
    )
}

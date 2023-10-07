import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import { Artist } from '../../../api/artist';
import styles from './InfoAlbum.module.css';


const artistControl = new Artist();

export function InfoAlbum(props) {

    // Load Artist Data
    const [artistInfo, setartistInfo] = useState(null);

    useEffect(() => {
        (async () =>{           
            try {
                const response = await artistControl.getArtist(props.album.artist);
                setartistInfo(response);
            } catch (error) {
                console.error(error);
            }
        }) ()
    }, [props.album]);
    
    
    return (
        <div className={ styles.content }>
   
            <img 
                className={ styles.albumImage }
                src={ props.album.image }
                alt={ props.album.name }
            />

            <div className={ styles.textContent }> 
                <h2 className={ styles.textAlbum }>{ props.album.name }</h2>
                { artistInfo && 
                    <Link className={ styles.textArtist } to={ `/artists/${props.album.artist}` }>
                        { artistInfo.name }
                    </Link> 
                }
            </div>

        </div>
    )
}

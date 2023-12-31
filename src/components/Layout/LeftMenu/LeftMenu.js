import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ModalSimple } from '../../Shared';
import { NewArtistForm } from '../../Artist';
import { NewAlbumForm } from '../../Album';
import { NewSongForm } from '../../Song';
import styles from './LeftMenu.module.css';
import { homeIcon, artistIcon, albumIcon, addIcon } from '../../../assets';


export  function LeftMenu() {

  // Open / Close Modal
  const [showModal, setShowModal] = useState(false);

  // Modal Data
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  const closeModal = () => {
    setShowModal(false);    
    setTitleModal("");
    setContentModal(null);
  };

  const openModal = (type) => {
    setShowModal(true);

    if ( type === "theme" ) {
      setTitleModal( <p className={ styles.formTitle }> Nueva Canción </p> );
      setContentModal( <NewSongForm closeModal={ closeModal }/> );
    }
    if ( type === "artist" ) {
      setTitleModal( <p className={ styles.formTitle }> Nuevo Artista </p> );
      setContentModal( <NewArtistForm closeModal={ closeModal }/> );
    }
    if ( type === "album" ) {
      setTitleModal( <p className={ styles.formTitle }> Nuevo Albúm </p> );
      setContentModal( <NewAlbumForm closeModal={ closeModal }/> );
    }

  };

  
  return (
    <>
      <div className={ styles.content }>

        <nav className={ styles.menu }>
          <NavLink  
            className={ ({ isActive }) =>
              isActive ? `${ styles.option } ${ styles.active }` : 
              styles.option
            }
            to="/" 
          >
            <p>Inicio</p>
            <img src={ homeIcon } alt='Página de Inicio'/>
          </NavLink>

          <NavLink 
            className={ ({ isActive }) =>
              isActive ? `${ styles.option } ${ styles.active }` : 
              styles.option
            }
            to="/artists" 
          >
            <p>Artistas</p>
            <img src={ artistIcon } alt='Página de Artistas'/>
          </NavLink>

          <NavLink 
            className={ ({ isActive }) =>
              isActive ? `${ styles.option } ${ styles.active }` : 
              styles.option
            }
            to="/albums" 
          >
            <p>Álbumes</p>
            <img src={ albumIcon } alt='Página de Álbumes'/>
          </NavLink>
        </nav>

  
        { showModal && (
          <ModalSimple 
            closeModal={ closeModal }
            title={ titleModal }
            children={ contentModal }
          />
        )}

        <nav className={ styles.menu }>
          <NavLink  
            className={ styles.option }
            onClick={ () => openModal("theme") }
          >
            <p> Nueva Canción </p>
            <img src={ addIcon } alt='Crear Canción'/>
          </NavLink>

          <NavLink 
            className={ styles.option }
            onClick={ () => openModal("artist") }
          >
            <p> Nuevo Artista </p>
            <img src={ addIcon } alt='Crear Artistas'/>
          </NavLink>

          <NavLink 
            className={ styles.option } 
            onClick={ () => openModal("album") }
          >
            <p> Nuevo Álbum </p>
            <img src={ addIcon } alt='Crear Álbumes'/>
          </NavLink>
        </nav>

      </div>
    </>
  )
}

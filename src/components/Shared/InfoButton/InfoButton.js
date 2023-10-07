import React, { useState } from 'react';
import { ModalSimple } from '../ModalSimple/ModalSimple';
import styles from './InfoButton.module.css';


export function InfoButton(props) {


  // Open / Close Modal
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);    
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  return (
    <>

      <button className={ styles.button } onClick={ toggleModal }>
        ?
      </button>

      { showModal && (
        <ModalSimple closeModal={ closeModal }>
          <span className={ styles.message }>

            <h4> ¡ Bienvenido a Soundwave ! </h4>

            <div className={ styles.auth }>
              <p> Usuario de muestra : <i> soundwave.login@gmail.com </i> </p>
              <p> Contraseña de muestra : <i> password1234 </i> </p>
            </div>

            <p> Algunas aclaraciones: </p>

            <p>  Debido a la temprana fase de desarrollo aún es posible encontrarse aspectos inacabados, como es el caso del diseño responsive. </p>

            <p>  Algunos formularios han sido desactivados en esta presentación para evitar la publicación de contenido no deseado. </p>

            <p>  Por motivos de copyright, los temas musicales publicados no corresponden a los artistas mostrados. </p>
            
          </span>
        </ModalSimple>
      )}

    </>
  )
}
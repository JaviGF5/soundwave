import React from 'react';
import styles from './ModalSimple.module.css';


export function ModalSimple(props) {

  return (

    <div className={ styles.content }>

      <div className={ styles.modal }> 

        <button className={ styles.close } onClick={ props.closeModal} > + </button>
        <h3 className={ styles.title }> { props.title } </h3>
        <div className={ styles.children }> { props.children } </div>

      </div>
      
    </div>
    

  )
}

  

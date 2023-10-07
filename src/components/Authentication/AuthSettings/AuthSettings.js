import React from 'react';
import styles from './AuthSettings.module.css';
import authStyles from '../../../styles/components/authentication.module.css';


export function AuthSettings(props) {

  
  return (
    <div className={ authStyles.cards }>
      
        <h2 className={ `${ authStyles.title }` }> Feel the vibes. </h2>

        <button 
          className={ `${ authStyles.button } ${ styles.space }` } 
          onClick={ props.goRegister } 
        > 
          Registrarse 
        </button>

        <button className={ authStyles.button } onClick={ props.goLogin }>
          Iniciar Sesión
        </button>

    </div>
  )
}

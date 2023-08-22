import React from 'react';
import styles from './AuthSettings.module.css';
import authStyles from '../../../styles/components/authentication.module.css';




export function AuthSettings(props) {

  const { goLogin, goRegister } = props; 


  return (
    <div className={ authStyles.cards }>
      
        <h2 className={ `${ authStyles.title }`}>Feel the vibes.</h2>

        <button className={`${ authStyles.button } ${ styles.containt }`} onClick={ goRegister } >Registrarse</button>

        <button className={ authStyles.button } onClick={ goLogin }>Iniciar Sesión</button>

    </div>
  )
}

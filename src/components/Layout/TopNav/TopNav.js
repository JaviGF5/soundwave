import React from 'react';
import styles from './TopNav.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { leftIcon, rightIcon, closeIcon, userIcon  } from '../../../assets';
import { Auth, User } from '../../../api';

const auth = new Auth();
const user = new User();

export function TopNav() {

  const navigation = useNavigate();

  const userInfo = user.getMe();

  const displayName = userInfo.displayName || "Cuenta Usuario";
  const avatar = userInfo.photoURL || userIcon ;

  const goBack = () => navigation(-1); 
  const goNext = () => navigation(+1);


  return (
    <div className={ styles.content }>

      <nav className={ styles.navbar }> 

        <div className={ styles.option }>
          <img 
            src={ leftIcon } 
            className={ styles.icon } 
            alt="Ir Atrás" 
            onClick={ goBack }
          />
          <img 
            src={ rightIcon }
            className={ styles.icon } 
            alt="Volver Alante" 
            onClick={ goNext }
          />
        </div>


        <NavLink 
          to="/profile"
          className={ styles.option }
        >
          <img src={ avatar } alt="Perfil de Usuario" className={ styles.avatar }/>
          <span>{ displayName }</span>
        </NavLink>

        <div className={ styles.option }>
          <img src={ closeIcon }
            className={ `${styles.icon}`} 
            alt="Cerrar Sesión" 
            onClick={ auth.logout }
          />
        </div>


      </nav>
    </div>
  )
}

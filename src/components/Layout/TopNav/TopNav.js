import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Auth, User } from '../../../api';
import styles from './TopNav.module.css';
import { leftIcon, rightIcon, closeIcon, userIcon  } from '../../../assets';


const auth = new Auth();
const user = new User();

export function TopNav() {

  const navigation = useNavigate();

  // Profile Info
  const userInfo = user.getMe();
  const displayName = userInfo.displayName || "Cuenta Usuario";
  const avatar = userInfo.photoURL || userIcon ;

  // Navigation Control -> forward / backward
  const goBack = () => navigation(-1); 
  const goNext = () => navigation(+1);


  return (
    <div className={ styles.content }>

      <nav className={ styles.navbar }> 

        <div className={ styles.option }>
          <img 
            className={ styles.icon } 
            src={ leftIcon } 
            alt="Ir Atrás" 
            onClick={ goBack }
          />
          <img 
            className={ styles.icon } 
            src={ rightIcon }
            alt="Volver Alante" 
            onClick={ goNext }
          />
        </div>

        <NavLink className={ styles.option } to="/profile">
          <img 
            className={ styles.avatar }
            src={ avatar } 
            alt="Perfil de Usuario" 
          />
          <span> { displayName } </span>
        </NavLink>

        <div className={ styles.option }>
          <img 
            className={ `${ styles.icon }` } 
            src={ closeIcon }
            alt="Cerrar Sesión" 
            onClick={ auth.logout }
          />
        </div>

      </nav>

    </div>
  )
}

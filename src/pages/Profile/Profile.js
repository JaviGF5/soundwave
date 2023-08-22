import React, { useState } from 'react';
import styles from './Profile.module.css';
import { User } from '../../api';
import { UpdateAvatar, UpdateNameForm, UpdateEmailForm, UpdatePasswordForm } from '../../components/Profile';
import { ModalSimple } from '../../components/Shared';


const userControl = new User();

export function Profile() {

  // Cargar nombre y email
  const { displayName, email } = userControl.getMe();

  // Abrir/Cerrar Modal
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  // Contenido del Modal
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  // Abrir formularios en el Modal
  const openForm = (type) => {
    if ( type === "displayName" ) {
      openModal();
      setTitleModal("Actualizar nombre");
      setContentModal(<UpdateNameForm closeModal={ closeModal } />);
    }
    if ( type === "email" ) {
      openModal();
      setTitleModal("Actualizar Email");
      setContentModal(<UpdateEmailForm closeModal={ closeModal } />);  
    }
    if ( type === "password" ) {
      openModal();
      setTitleModal("Actualizar Contraseña");
      setContentModal(<UpdatePasswordForm closeModal={ closeModal } />);
    }
  }

  return (
    <div className={ styles.content }>

      <h2>Configuración</h2>
      <p>CUENTA DE USUARIO</p>
      
      <div className={ styles.perfil }>
        <UpdateAvatar  />
      </div>

      <div className={ styles.perfil }>
        <span>Nombre : <i>{ displayName }</i> </span>
        <button className={ styles.update } onClick={ () => openForm("displayName") }>Actualizar</button>
        {isOpen && (
          <ModalSimple 
            title={ titleModal } 
            children={ contentModal } 
            closeModal={ closeModal }
          />
        )}    
      </div>

      <div className={ styles.perfil }>
        <span>Correo : <i>{ email }</i> </span>
        <button className={ styles.update } onClick={ () => openForm("email") }>Actualizar</button>
        {isOpen && (
          <ModalSimple 
            title={ titleModal } 
            children={ contentModal } 
            closeModal={ closeModal }
          />
        )}    
      </div>   

      <div className={ styles.perfil }>
        <span>Contraseña : <i>********</i></span>
        <button className={ styles.update } onClick={ () => openForm("password") }>Actualizar</button>
        {isOpen && (
          <ModalSimple 
            title={ titleModal } 
            children={ contentModal } 
            closeModal={ closeModal }
          />
        )} 
      </div>

    </div>
  )
}
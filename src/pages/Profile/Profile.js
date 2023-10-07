import React, { useState } from 'react';
import { User } from '../../api';
import { UpdateAvatar, UpdateNameForm, UpdateEmailForm, UpdatePasswordForm } from '../../components/Profile';
import { ModalSimple } from '../../components/Shared';
import styles from './Profile.module.css';


const userControl = new User();

export function Profile() {

  const { displayName, email } = userControl.getMe();

  // Modal Controls
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  // Modal Content
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  // Open Forms inside Modal
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

      <h2 className={ styles.title }> Configuración de usuario </h2>

      <div className={ styles.field }>
        <UpdateAvatar />
      </div>
      

      <div className={ styles.field }>
        <span> Nombre : <b> { displayName } </b> </span>
        <button className={ styles.button } onClick={ () => openForm("displayName") }> 
          Actualizar 
        </button>

        {isOpen && (
          <ModalSimple 
            title={ titleModal } 
            children={ contentModal } 
            closeModal={ closeModal }
          />
        )}  
      </div>


      <div className={ styles.field }>
        <span> Correo : <b> { email } </b> </span>
        <button className={ styles.button } onClick={ () => openForm("email") }> 
          Actualizar 
        </button>

        {isOpen && (
          <ModalSimple 
            title={ titleModal } 
            children={ contentModal } 
            closeModal={ closeModal }
          />
        )}  
      </div>   


      <div className={ styles.field }>
        <span> Contraseña : <b> ********** </b> </span>
        <button className={ styles.button } onClick={ () => openForm("password") }> 
          Actualizar 
        </button>

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
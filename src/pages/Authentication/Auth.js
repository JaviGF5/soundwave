import React, { useState } from 'react';
import styles from './Auth.module.css';
import { AuthSettings, LoginForm, RegisterForm } from '../../components';
import { logoWhite } from '../../assets';


export function Auth() {

  const [selectForm, setSelectForm] = useState(null);

    const goLogin = () => setSelectForm("loginScreen");
    const goRegister = () => setSelectForm("registerScreen");
    const goAuth = () => setSelectForm(null);

    const renderAuthForms = () => {

      if (selectForm === "loginScreen") {
        return <LoginForm goRegister={ goRegister } goAuth={ goAuth }/>
      }
      if (selectForm === "registerScreen") {
        return <RegisterForm goLogin={ goLogin } goAuth={ goAuth } />
      }
      return  <AuthSettings goLogin={ goLogin } goRegister={ goRegister }/>

    };

  return(
   
    <div className={ styles.page } >

      <div className={ styles.circleAnimation }></div> 

      <div className={ styles.card } >
        
        <img src={ logoWhite } alt='Logo Soundwave' className={ styles.logoAuth }/>
       <h1>{renderAuthForms()}</h1>
       
      </div>
       
    </div>   
     
  ); 
}






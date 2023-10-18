import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Auth } from '../../../api';
import { initialValues, validationSchema } from './LoginForm.data';
import styles from './LoginForm.module.css';
import authStyles from '../../../styles/components/authentication.module.css';
import formsStyles from '../../../styles/components/forms.module.css'
import { showIcon, noShowIcon } from '../../../assets';


const auth = new Auth();

export function LoginForm(props) {

  const [showPassword, setShowPassword] = useState(false); 
  
  // Form, Check and Upload
  const formik = useFormik({
    // Using 'Yup' to validate Form
    initialValues: initialValues(),                       
    validationSchema: validationSchema(),                 
    validateOnChange: false,
    // Submit Form Controller                            
    onSubmit: async (formValues) => {                     
      try {
        await auth.login(formValues.email, formValues.password);
      } catch (error) {
        console.error(error)
      }
    },
  });

  
  return (
    <div className={ authStyles.cards }>
      
      <h2 className={ authStyles.title }> Iniciar Sesión </h2>
    
      <form onSubmit={ formik.handleSubmit }>

        <div className={ formsStyles.inputContent }>
          <input 
            className={ formsStyles.input }
            name="email" 
            type="text" 
            placeholder="Correo electrónico"
            maxLength="41"
            onBlur={ formik.handleBlur }
            onChange={ formik.handleChange }
            value={ formik.values.email }
          />
        </div>
          { 
            formik.touched.email && formik.errors.email ? 
            <p className={ formsStyles.error }> { formik.errors.email } </p> : 
            null 
          }


        <div className={ formsStyles.inputContent }>
          <input 
            className={ formsStyles.input }
            name="password" 
            type={ showPassword ? "text" : "password" } 
            placeholder="Contraseña"
            maxLength="25"
            onBlur={ formik.handleBlur }
            onChange={ formik.handleChange }
            value={ formik.values.password }
          />  
          <div className={ formsStyles.iconContent } onClick={ () => setShowPassword(!showPassword) }>
            { 
              showPassword ? 
              <img src={ noShowIcon } alt='mostrar constraseña' /> :
              <img src={ showIcon } alt='mostrar constraseña' />
            } 
          </div>
        </div>  
          {
            formik.touched.password && formik.errors.password ? 
            ( <p className={ formsStyles.error }> { formik.errors.password } </p>) : 
            null
          }  


        <button className={ formsStyles.button } type="submit"> 
          INICIAR SESIÓN 
        </button>

      </form>

      <p className={ styles.textInfo }>¿No tienes cuenta? 
        <span className={ styles.textLink } onClick={ props.goRegister }> REGÍSTRATE </span>
        de forma sencilla.
      </p>
        
       <div className={ styles.contentButton }>
        <button className={ authStyles.button } onClick={ props.goAuth }> ATRÁS </button>
      </div>    
        
    </div>
  )
}

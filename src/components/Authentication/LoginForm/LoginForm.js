import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import authStyles from '../../../styles/components/authentication.module.css';
import formsStyles from '../../../styles/components/forms.module.css'
import { Auth } from '../../../api/authentication';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './LoginForm.data';
import { showIcon, noShowIcon } from '../../../assets';

const auth = new Auth();

export function LoginForm(props) {

  const { goRegister, goAuth } = props; 

  const [showPassword, setShowPassword] = useState(false); 
  
  const formik = useFormik({
    initialValues: initialValues(),                       // Trasmisión de 'values' de los inputs
    validationSchema: validationSchema(),                 // Propiedades y requisitos de la validación de Yup
    validateOnChange: false,                              // Validar el formulario cuando se envíe 
    onSubmit: async (formValues) => {                     // Controlador de envíos de formularios
      try {
        await auth.login(formValues.email, formValues.password);
      } catch (error) {
        console.error(error)
      }
    },
  });

  return (
    <div className={ authStyles.cards }>
      
      <h2 className={ authStyles.title }>Iniciar Sesión</h2>

      
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
          <div className={ formsStyles.iconContent } onClick={() => setShowPassword(!showPassword)}>
            { 
              showPassword ? 
              <img src={ noShowIcon } alt='mostrar constraseña' /> :
              <img src={ showIcon } alt='mostrar constraseña' />
            } 
          </div>
        </div>  
            {
              formik.touched.password && formik.errors.password ? 
              ( <p className={formsStyles.error}>{formik.errors.password}</p>) : 

              formik.touched.password && formik.validateOnChange === false ? 
              ( <p className={formsStyles.error}>*Contraseña incorrecta</p> ) :

              null
            }  

        <button 
          className={ formsStyles.button }
          type="submit"
        >INICIAR SESIÓN</button>

      </form>

   
      
        <p className={ styles.textInfo }>¿No tienes cuenta? 
        <span className={ styles.textLink } onClick={ goRegister }> REGÍSTRATE </span>
         de forma sencilla.</p>
        
       <div className={ styles.contentButton }>
        <button className={ authStyles.button }onClick={ goAuth }>Atrás</button>
      </div>    
        

    </div>
  )
}

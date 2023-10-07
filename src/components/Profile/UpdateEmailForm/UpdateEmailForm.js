import React, { useState } from 'react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './UpdateEmailForm.data';
import { User } from '../../../api';
import styles from './UpdateEmailForm.module.css';
import formsStyles from '../../../styles/components/forms.module.css';
import { showIcon, noShowIcon } from '../../../assets';


const userControl = new User();

export function UpdateEmailForm(props) {

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
          await userControl.updateUserEmail(formValues.email, formValues.password);
          props.closeModal();
        } catch (error) {
          console.log(error);
        }
      }
    })

    
  return (
    <form onSubmit={ formik.handleSubmit } >

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
            maxLength="30"
            onBlur={ formik.handleBlur }
            onChange={ formik.handleChange }
            value={ formik.values.password }
            autoComplete="off"
          />
            <div className={ `${ formsStyles.iconContent } ${ styles.showIcon }` } onClick={() => setShowPassword(!showPassword)} >
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

              formik.touched.password && formik.validateOnChange === false ? 
              ( <p className={ formsStyles.error }> *Contraseña incorrecta </p> ) :

              null
            }


        <button className={ formsStyles.button } type="submit">
            ACTUALIZAR
        </button>

    </form>
  )
} 

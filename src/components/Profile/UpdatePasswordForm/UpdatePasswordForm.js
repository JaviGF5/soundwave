import React, { useState } from 'react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './UpdatePasswordForm.data';
import { User } from '../../../api';
import styles from './UpdatePasswordForm.module.css';
import formsStyles from '../../../styles/components/forms.module.css';
import { showIcon, noShowIcon } from '../../../assets';

const userControl = new User();

export function UpdatePasswordForm(props) {

    const [showPassword, setShowPassword] = useState(false); 

    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: false,
      onSubmit: async (formValues) => {
        try {
          await userControl.updateUserPassword(formValues.password, formValues.newPassword);
          props.closeModal();
        } catch (error) {
          console.log(error);
        }
      }
    })

  return (
    <>
      <form onSubmit={ formik.handleSubmit } >

        <div className={ formsStyles.inputContent }>
          <input 
            className={ formsStyles.input }
            name="password" 
            type={ showPassword ? "text" : "password" } 
            placeholder="Contraseña Actual"
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
                ( <p className={formsStyles.error}>{formik.errors.password}</p>) : 

                formik.touched.password && formik.validateOnChange === false ? 
                ( <p className={formsStyles.error}>*Contraseña incorrecta</p> ) :

                null
            }

        <div className={ formsStyles.inputContent }>
          <input 
            className={ formsStyles.input }
            name="newPassword" 
            type={ showPassword ? "text" : "password" } 
            placeholder="Nueva Contraseña"
            maxLength="30"
            onBlur={ formik.handleBlur }
            onChange={ formik.handleChange }
            value={ formik.values.newPassword }
            autoComplete="off"
          />
            <div className={ `${ formsStyles.iconContent } ${ styles.showIcon }` } onClick={() => setShowPassword(!showPassword)}>
                { 
                    showPassword ? 
                    <img src={ noShowIcon } alt='mostrar constraseña' /> :
                    <img src={ showIcon } alt='mostrar constraseña' />
                } 
            </div>
        </div>
            {
                formik.touched.newPassword && formik.errors.newPassword ? 
                <p className={formsStyles.error}>{formik.errors.newPassword}</p> : 
                null
            }

        <div className={ formsStyles.inputContent }>
          <input 
            className={ formsStyles.input }
            name="repeatNewPassword" 
            type={ showPassword ? "text" : "password" } 
            placeholder="Repite Nueva Contraseña"
            maxLength="30"
            onBlur={ formik.handleBlur }
            onChange={ formik.handleChange }
            value={ formik.values.repeatNewPassword }
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
                formik.touched.repeatNewPassword && formik.errors.repeatNewPassword ? 
                <p className={formsStyles.error}>{formik.errors.repeatNewPassword}</p> : 
                null
            }

        <button className={ formsStyles.button } type="submit">
            ACTUALIZAR
        </button>

      </form>
    </>
  )
}

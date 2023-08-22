import React from 'react';
import formsStyles from '../../../styles/components/forms.module.css';
import { useFormik } from 'formik';
import { User } from '../../../api';
import { initialValues, validationSchema } from './UpdateNameForm.data';


const userControl = new User();

export function UpdateNameForm(props) {

  const { displayName } = userControl.getMe();

  const formik = useFormik({
    initialValues: initialValues(displayName),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await userControl.updateUserName(formValues.displayName)
        props.closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  })

  return (
    <>

      <form onSubmit={ formik.handleSubmit }>

        <div className={ formsStyles.inputContent }>
          <input 
            className={ formsStyles.input }
            name="displayName" 
            type="text" 
            placeholder="Nombre y Apellidos"
            maxLength="41"
            onBlur={ formik.handleBlur }
            onChange={ formik.handleChange }
            value={ formik.values.displayName }
          />  
        </div>
            { 
              formik.touched.displayName && formik.errors.displayName ? 
              <p className={ formsStyles.error }> { formik.errors.displayName } </p> : 
              null 
            }

        <button className={ formsStyles.button } type="submit">
            ACTUALIZAR
        </button>

      </form>

    </>
  )
} 

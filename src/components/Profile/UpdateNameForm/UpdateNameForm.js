import React from 'react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './UpdateNameForm.data';
import { User } from '../../../api';
import formsStyles from '../../../styles/components/forms.module.css';

const userControl = new User();

export function UpdateNameForm(props) {

  const { displayName } = userControl.getMe();

  // Form, Check and Upload
  const formik = useFormik({
    // Using 'Yup' to validate Form
    initialValues: initialValues(displayName),
    validationSchema: validationSchema(),
    validateOnChange: false,
    // Submit Form Controller
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
  )
} 

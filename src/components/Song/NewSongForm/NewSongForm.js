import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import { initialValues, validationSchema } from './NewSongForm.data';
import { Album, Storage, Song } from '../../../api';
import styles from './NewSongForm.module.css';
import formsStyles from '../../../styles/components/forms.module.css';
import { uploadIcon } from '../../../assets'; 


const albumControl = new Album();
const storageControl = new Storage();
const songControl = new Song();

export function NewSongForm(props) {

  // Form, Check and Upload
  const formik = useFormik({
    // Using 'Yup' to validate Form
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    // Submit Form Controller
    onSubmit: async (formValues) => {
        try {
            const { file, album, name } = formValues;
            // Firebase Storage Folder "song"
            const response = await storageControl.uploadFile(file, "song", uuidv4());
            const url = await storageControl.getUrlFile(response.metadata.fullPath);
            await songControl.create(url, album, name);
            props.closeModal();
        } catch (error) {
            console.error(error);
        }
    }
  })


  // Load Song File
  const [songName, setSongName] = useState("Nombre del archivo");

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setSongName(file.name);
    formik.setFieldValue("file", file);
    formik.setFieldValue("name", file.name);
  });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  
  // Load All Albums
  const [selectAlbum, setSelectAlbum] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumControl.obtainAll();
        setSelectAlbum(response);
      } catch (error) {
        console.log(error);
      }
    }) ()
  }, []);

  
  return (
    <form onSubmit= { formik.handleSubmit }>

      <div 
          className={ classNames( styles.image,
              { [ formsStyles.errorImage ] : formik.errors.file, }
          ) } 
          { ...getRootProps() }
      >
        <input { ...getInputProps() }/>
        <img 
          className={ styles.uploadFile }
          src={ uploadIcon } 
          alt="Subir canción"
        />
        <span className={ formsStyles.uploadText }> 
          Haz click o arrastra una cancíon
          { songName && (<p className={ styles.songName }> { songName } </p>) } 
        </span>
      </div>  


      <label className={ formsStyles.label }>Albúm al que pertenece :</label>
      <select 
        className={ `${ formsStyles.input } ${ formsStyles.dropdown }` }
        name="album"
        placeholder="Álbum de la canción"
        onBlur={ formik.handleBlur }
        onChange={ formik.handleChange }
        value={ formik.values.album }
      > 
        <option value="" disabled> -- Seleccionar -- </option>
        {
          selectAlbum.map(album => (
            <option key={album.id} value={album.id}>
              {album.name}
            </option>
          ))
        }
      </select>
        { 
          formik.touched.album && formik.errors.album ? 
          <p className={ formsStyles.error }> { formik.errors.album } </p> : 
          null 
        }


      <div className={ formsStyles.inputContent }>
        <input 
          className={ formsStyles.input }
          name="name"
          type="text" 
          placeholder="Nombre de la Canción"
          maxLength="41"
          onBlur={ formik.handleBlur }
          onChange={ formik.handleChange }
          value={ formik.values.name }
        />
      </div>
        { 
          formik.touched.name && formik.errors.name ? 
          <p className={ formsStyles.error }> { formik.errors.name } </p> : 
          null 
        }


      <button className={ formsStyles.button } type="submit">
        REGISTRAR CANCIÓN
      </button>

    </form>
  )
}

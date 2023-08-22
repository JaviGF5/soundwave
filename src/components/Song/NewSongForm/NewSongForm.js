import React, { useState, useEffect, useCallback } from 'react';
import styles from './NewSongForm.module.css';
import formsStyles from '../../../styles/components/forms.module.css';
import { uploadIcon } from '../../../assets';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './NewSongForm.data';
import { useDropzone } from 'react-dropzone';
import { Album, Storage, Song } from '../../../api';
import { v4 as uuidv4 } from 'uuid';
 

const albumControl = new Album();
const storageControl = new Storage();
const songControl = new Song();

export function NewSongForm(props) {

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
        try {
            // Cargar datos y facilitar su uso
            const { file, album, name } = formValues;
            // Subir imagen al storage en la carpeta "artist" y con su id correspondiente
            const response = await storageControl.uploadFile(file, "song", uuidv4());
            // Obtener URL
            const url = await storageControl.getUrlFile(response.metadata.fullPath);
            await songControl.create(url, album, name);
            props.closeModal();
        } catch (error) {
            console.error(error);
        }
    }
  })

  // Cargar Canción
  const [songName, setSongName] = useState("Nombre del archivo");

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setSongName(file.name);
    formik.setFieldValue("file", file);
    formik.setFieldValue("name", file.name);
  });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });


  // Cargar Albumes
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
              { [ styles.errorSong ] : formik.errors.file, }
          ) } 
          { ...getRootProps() }
      >
        <input { ...getInputProps() }/>
        <img 
          src={ uploadIcon } 
          className={ styles.noSongFile } 
          alt="Subir canción"
        />
        <span className={ styles.uploadText }> 
          Haz click o arrastra una cancíon
          { songName && (<p className={ styles.songName }> { songName } </p>) } 
        </span>
      </div>  


      <label className={ styles.label }>Albúm al que pertenece :</label>
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

import React, { useState, useEffect, useCallback } from 'react';
import styles from './NewAlbumForm.module.css';
import formsStyles from '../../../styles/components/forms.module.css';
import classNames from 'classnames';
import { errorImage } from '../../../assets';
import { Artist, Album, Storage } from '../../../api';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'lodash';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './NewAlbumForm.data';
import { useDropzone } from 'react-dropzone';


const artistControl = new Artist();
const albumControl = new Album();
const storageControl = new Storage();

export function NewAlbumForm(props) {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                const {name, file, artist } = formValues;
                const response = await storageControl.uploadFile(file, "album", uuidv4());
                const url = await storageControl.getUrlFile(response.metadata.fullPath);
                await albumControl.create(url, name, artist);
                props.closeModal();
            } catch (error) {
                console.log(error);
            }
        }
    });

    // Cargar Imagen
    const [photo, setPhoto] = useState(null);

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        setPhoto(URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    });
    const { getRootProps, getInputProps } = useDropzone({ onDrop });



    const [selectArtist, setSelectArtists] = useState([]);

    // Cargar artistas
    useEffect(() => {
        (async () => {
            try {
                const response = await artistControl.obtainAll();
                setSelectArtists(response);
            } catch (error) {
                console.log(error);
            }
        }) ()
    }, []);

  return (
    <form onSubmit= { formik.handleSubmit }>

       <div 
            className={ classNames( styles.image,
                { [ styles.errorImage ] : formik.errors.file, }
            )}
            { ...getRootProps() }
        >
            <input { ...getInputProps() }/>
            <img 
                src={ photo || errorImage } 
                className={ classNames( styles.noPhoto,
                    { [ styles.photo ] : photo }
                )} 
                alt="Foto de usuario"
            />
            <p className={ styles.uploadImage }> Haz click o arrastra una imagen </p>
        </div> 


        <label className={ styles.label }>Autor del albúm :</label>
        <select 
            className={ `${ formsStyles.input } ${ formsStyles.dropdown }` }
            name="artist"
            placeholder="Autor del albúm..."
            onBlur={ formik.handleBlur }
            onChange={ formik.handleChange }
            value={ formik.values.artist }
        > 
            <option value="" disabled> -- Seleccionar --</option>
            {
                selectArtist.map(artist => (
                    <option key={artist.id} value={artist.id}>
                        {artist.name}
                    </option>
                ))
            }
        </select>
            { 
                formik.touched.artist && formik.errors.artist ? 
                <p className={ formsStyles.error }> { formik.errors.artist } </p> : 
                null 
            }  


        <div className={ formsStyles.inputContent }>
            <input 
                className={ formsStyles.input }
                name="name"
                placeholder="Nombre del Albúm"
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
            REGISTRAR ALBÚM
        </button>

    </form>
  )
}

import React, { useState, useCallback } from 'react';
import styles from './NewArtistForm.module.css';
import formsStyles from '../../../styles/components/forms.module.css';
import { errorImage } from '../../../assets';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import { initialValues, validationSchema } from './NewArtistForm.data';
import { Artist, Storage } from '../../../api';
import { v4 as uuidv4 } from 'uuid';


const storageControl = new Storage();
const artistControl = new Artist(); 

export  function NewArtistForm(props) {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues) => {
            try {
                // Cargar datos y facilitar su uso
                const { file, name } = formValues;
                // Subir imagen al storage en la carpeta "artist" y con su id correspondiente
                const response = await storageControl.uploadFile(file, "artist", uuidv4());

                // Obtener URL
                const url = await storageControl.getUrlFile(response.metadata.fullPath);
                await artistControl.create(url, name);

                props.closeModal();
                
            } catch (error) {
                console.error(error);
            }
        }
    })

    // Cargar Imagen
    const [photo, setPhoto] = useState(null);

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        setPhoto(URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    });

    const { getRootProps, getInputProps } = useDropzone({ onDrop });


    return (
        <form onSubmit= { formik.handleSubmit }>

            <div 
                className={ classNames( styles.image,
                    { [ styles.errorImage ] : formik.errors.file, }
                ) } 
                { ...getRootProps() }
            >
                <input { ...getInputProps() }/>
                <img 
                    src={ photo || errorImage } 
                    className={ classNames ( styles.noPhoto, 
                        { [ styles.photo ] : photo }
                    )} 
                    alt="Foto de usuario"
                />
                <p className={ styles.uploadImage }> Haz click o arrastra una imagen </p>
            </div>

            <div className={ formsStyles.inputContent }>
                <input 
                    className={ formsStyles.input }
                    name="name"
                    type="text" 
                    placeholder="Nombre del Artista"
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
                REGISTRAR ARTISTA
            </button>

        </form>
    )
}

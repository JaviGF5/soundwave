import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import { initialValues, validationSchema } from './NewArtistForm.data';
import { Artist, Storage } from '../../../api';
import styles from './NewArtistForm.module.css';
import formsStyles from '../../../styles/components/forms.module.css';
import { errorImage } from '../../../assets';


const storageControl = new Storage();
const artistControl = new Artist(); 

export  function NewArtistForm(props) {

    // Form, Check and Upload
    const formik = useFormik({
        // Using 'Yup' to validate Form
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        // Submit Form Controller
        onSubmit: async (formValues) => {
            try {
                const { file, name } = formValues;
                // Firebase Storage Folder "artist"
                const response = await storageControl.uploadFile(file, "artist", uuidv4());
                const url = await storageControl.getUrlFile(response.metadata.fullPath);
                await artistControl.create(url, name);
                props.closeModal();
            } catch (error) {
                console.error(error);
            }
        }
    })

    // Load Form Image
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
                    { [ formsStyles.errorImage ] : formik.errors.file, }
                ) } 
                { ...getRootProps() }
            >
                <input { ...getInputProps() }/>
                <img 
                    className={ classNames ( styles.noPhoto, 
                        { [ styles.photo ] : photo }
                    )} 
                    src={ photo || errorImage } 
                    alt="Foto de usuario"
                />
                <p className={ formsStyles.uploadText }> Haz click o arrastra una imagen </p>
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

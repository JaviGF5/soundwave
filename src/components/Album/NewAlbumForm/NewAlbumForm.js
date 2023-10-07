import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import { initialValues, validationSchema } from './NewAlbumForm.data';
import { Artist, Album, Storage } from '../../../api';
import styles from './NewAlbumForm.module.css';
import formsStyles from '../../../styles/components/forms.module.css';
import { errorImage } from '../../../assets';


const artistControl = new Artist();
const albumControl = new Album();
const storageControl = new Storage();

export function NewAlbumForm(props) {

    // Form, Check and Upload
    const formik = useFormik({
        // Using 'Yup' to validate Form
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        // Submit Form Controller
        onSubmit: async (formValues) => {
            try {
                const {name, file, artist } = formValues;
                // Firebase Storage Folder "album"
                const response = await storageControl.uploadFile(file, "album", uuidv4());
                const url = await storageControl.getUrlFile(response.metadata.fullPath);
                await albumControl.create(url, name, artist);
                props.closeModal();
            } catch (error) {
                console.log(error);
            }
        }
    });


    // Load Form Image
    const [photo, setPhoto] = useState(null);

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        setPhoto(URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    });

    const { getRootProps, getInputProps } = useDropzone({ onDrop });


    // Load All Artists
    const [selectArtist, setSelectArtists] = useState([]);

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
                { [ formsStyles.errorImage ] : formik.errors.file, }
            )}
            { ...getRootProps() }
        >
            <input { ...getInputProps() }/>
            <img 
                className={ classNames( styles.noPhoto,
                    { [ styles.photo ] : photo }
                )}                
                src={ photo || errorImage } 
                alt="Foto de usuario"
            />
            <p className={ formsStyles.uploadText }> Haz click o arrastra una imagen </p>
        </div> 


        <label className={ formsStyles.label }>Autor del albúm :</label>
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
                    <option key={ artist.id } value={ artist.id }>
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

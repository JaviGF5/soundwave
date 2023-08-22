import React, { useCallback, useState } from 'react';
import styles from './UpdateAvatar.module.css';
import { errorImage } from '../../../assets';
import { useDropzone } from 'react-dropzone';
import { User, Storage } from '../../../api';

const userControl = new User();
const storageControl = new Storage();

export function UpdateAvatar() {

    const { photoURL, uid } = userControl.getMe();

    const [avatarURL, setAvatarURL] = useState( photoURL || errorImage );

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        setAvatarURL(URL.createObjectURL(file));

        // Cargar el archivo/imagen en la carpeta avatar y crear URL 
        const response = await storageControl.uploadFile(file, "avatar", uid);
        // Extraer la imagen
        const url = await storageControl.getUrlFile(response.metadata.fullPath);
        
        // Actualizar la URL (se actualiza la imagen en la APP)
        await userControl.updateAvatarUser(url);
    }) 

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div className={ styles.content } { ...getRootProps() } >
            <input { ...getInputProps() }/>
            <img src={ avatarURL } alt='Foto de usuario' />
        </div>
    )
}

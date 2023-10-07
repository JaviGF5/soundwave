import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { User, Storage } from '../../../api';
import styles from './UpdateAvatar.module.css';
import { errorImage } from '../../../assets';


const userControl = new User();
const storageControl = new Storage();

export function UpdateAvatar() {

    const { photoURL, uid } = userControl.getMe();

    const [avatarURL, setAvatarURL] = useState( photoURL || errorImage );

    // Load User Image
    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        setAvatarURL(URL.createObjectURL(file));
        const response = await storageControl.uploadFile(file, "avatar", uid);
        const url = await storageControl.getUrlFile(response.metadata.fullPath);
        await userControl.updateAvatarUser(url);
    });

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    
    return (
        <div className={ styles.content } { ...getRootProps() } >

            <p> Cambiar Avatar : </p>
            <input { ...getInputProps() } />
            <img src={ avatarURL } alt='Foto de usuario' />

        </div>
    )
}

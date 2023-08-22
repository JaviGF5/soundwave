// Subir archivos a Firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export class Storage {
    // Subir archivos
    async uploadFile(file, folder, nameFile) {
        try {
            // Obtener Storage
            const storage  = getStorage();
            // Guardamos la referencia de donde se sube el storage, indicamos como "carpeta/nombre"
            const fileRef = ref(storage, `${folder}/${nameFile}`);
            // Subir archivo al storage
            return await uploadBytes(fileRef, file);
        } catch (error) {
            throw error;
        }
    }

    // Actualizar archivos subidos en la APP
    async getUrlFile(pathFile) {
        try {
            // Obtener Storage
            const storage = getStorage();
            // Pasar stoage (donde se encuentran los archivos) y la ruta
            const fileRef = ref(storage, pathFile);
            // Obtener URL
            return await getDownloadURL(fileRef);
        } catch (error) {
            throw error;
        }
    }
}
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


// export class Storage {

//     // Upload to Firebse
//     async uploadFile(file, folder, nameFile) {
//         try {
//             const storage  = getStorage();
//             // Place to Save
//             const fileRef = ref(storage, `${folder}/${nameFile}`);
//             return await uploadBytes(fileRef, file);
//         } catch (error) {
//             throw error;
//         }
//     }

//     // Update files in APP
//     async getUrlFile(pathFile) {
//         try {
//             const storage = getStorage();
//             // Get Storage Place
//             const fileRef = ref(storage, pathFile);
//             return await getDownloadURL(fileRef);
//         } catch (error) {
//             throw error;
//         }
//     }
// }

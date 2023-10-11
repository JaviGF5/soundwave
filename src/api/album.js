import { doc, setDoc, collection, getDocs, getDoc, where, query, orderBy, limit } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils';
import { map } from 'lodash';


// export class Album {
//     collectionName = "albums";

//     // Register Album
//     async create(image, name, artist) {
//         try {
//             const idAlbum = uuidv4();
//             const create_at = new Date();
//             const data = { id: idAlbum, image, name, artist, create_at };
//             // Register data in Firestore
//             await setDoc(doc(db, this.collectionName, idAlbum), data);
//         } catch (error) {
//             throw error;
//         }
//     }

//     // Group Albums
//     async obtainAll() {
//         try {
//             const collectionRef = collection(db, this.collectionName);
//             const snapshot = await getDocs(collectionRef);
//             return map(snapshot.docs, (doc) => doc.data());
//         } catch (error) {
//             throw error;
//         }
//     }

//     // Get Album
//     async getAlbum(id) {
//         try {
//             const docRef = doc(db, this.collectionName, id);
//             const snapshot = await getDoc(docRef);
//             return snapshot.data();
//         } catch (error) {
//            throw error; 
//         }
//     }

//     // Get Albums (Artist Page)
//     async getAlbumToArtist(idAdtist) {
//         try {
//             const whereRef = where("artist", "==", idAdtist);
//             const collectionRef = collection(db, this.collectionName);
//             // Database query
//             const queryRef = query(collectionRef, whereRef);
//             const snapshot = await getDocs(queryRef);
//             return map(snapshot.docs, (doc)=> doc.data());
//         } catch (error) {
//             throw error;
//         }
//     }

//    // Last albums (Home)
//    async getLastsAlbums(limitNumber = 15) {
//     try {
//         const collectionRef = collection(db, this.collectionName);
//         const orderByRef = orderBy("create_at", "desc");
//         const limitRef = limit(limitNumber);
//         // Database query
//         const queryRef = query(collectionRef, orderByRef, limitRef);
//         const snapshot = await getDocs(queryRef);
//         return map(snapshot.docs, (doc) => doc.data());
//     } catch (error) {
//         throw error;
//     }
//    }



// }

import { setDoc, doc, where, collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils';
import { map } from 'lodash';


export class Song {
    collectionName = "songs";

    async create(file, album, name) {
        try {
            // ID de la canción
            const id = uuidv4();
            // Fecha de creación de la canción
            const create_at= new Date(); 
            // Datos de la canción
            const data = { id, name, album, file, create_at };
            // Registrar datos en Firestore
            await setDoc(doc(db, this.collectionName, id), data);
        } catch (error) {
            throw error;
        }
    }

    async obtainAllToAlbum(idAlbum) {
        try {
            const whereRef = where("album", "==", idAlbum);
            const collectionRef = collection(db, this.collectionName);
            const queryRef = query(collectionRef, whereRef);
            const snapshot = await getDocs(queryRef)
            return map(snapshot.docs, (doc) => doc.data());

        } catch (error) {
            throw error;
        }
    }


    async gestLastSongs(limitNumber = 20) {
        try {
            const collectionRef = collection(db, this.collectionName);
            const orderByRef = orderBy("create_at", "desc");
            const limitRef = limit(limitNumber);
            const queryRef = query(collectionRef, orderByRef, limitRef);
            const snapshot = await getDocs(queryRef);
            return map(snapshot.docs, (doc) => doc.data());
        } catch (error) {
            throw error;
        }       
    }






}
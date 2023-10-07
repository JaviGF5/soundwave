import { setDoc, doc, where, collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils';
import { map } from 'lodash';


export class Song {
    collectionName = "songs";

    // Register Song
    async create(file, album, name) {
        try {
            const idSong = uuidv4();
            const create_at= new Date(); 
            const data = { idSong, name, album, file, create_at };
            // Register data in Firestore
            await setDoc(doc(db, this.collectionName, idSong), data);
        } catch (error) {
            throw error;
        }
    }

    // Get Songs (Album Page)
    async obtainAllToAlbum(idAlbum) {
        try {
            const whereRef = where("album", "==", idAlbum);
            const collectionRef = collection(db, this.collectionName);
            // Database query
            const queryRef = query(collectionRef, whereRef);
            const snapshot = await getDocs(queryRef)
            return map(snapshot.docs, (doc) => doc.data());

        } catch (error) {
            throw error;
        }
    }

    // Last Songs (Home)
    async gestLastSongs(limitNumber = 20) {
        try {
            const collectionRef = collection(db, this.collectionName);
            const orderByRef = orderBy("create_at", "desc");
            const limitRef = limit(limitNumber);
            // Database query
            const queryRef = query(collectionRef, orderByRef, limitRef);
            const snapshot = await getDocs(queryRef);
            return map(snapshot.docs, (doc) => doc.data());
        } catch (error) {
            throw error;
        }       
    }






}
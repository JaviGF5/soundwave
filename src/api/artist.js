import { setDoc, doc, collection, getDocs, getDoc, orderBy, limit, query } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils';
import { map } from 'lodash';


export class Artist {
    collectioName = "artists";

    // Register Artist
    async create(image, name) {
        try {
            const idArtist = uuidv4();
            const create_at = new Date();
            const data = { id: idArtist, image, name, create_at };
            // Register data in Firestore
            await setDoc(doc(db, this.collectioName, idArtist), data);
        } catch (error) {
            throw error;
        }
    }

    // Group all Artists
    async obtainAll() {
        try {
            const artistRef = collection(db, this.collectioName);
            const snapshot = await getDocs(artistRef);
            return map(snapshot.docs, (doc) => doc.data());
        } catch (error) {
            throw error;
        }
    }

    // Get Artist
    async getArtist(id) {
        try {
            const artistRef = doc(db, this.collectioName, id);
            const snapshot = await getDoc(artistRef);
            return snapshot.data();
        } catch (error) {
           throw error; 
        }
    }

    // Last artists (Home)
    async getLastsArtists(limitNumber = 15) {
        try {
            const collectionRef = collection(db, this.collectioName);
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
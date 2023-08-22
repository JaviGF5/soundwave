import { doc, setDoc, collection, getDocs, getDoc, where, query, orderBy, limit } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils';
import { map } from 'lodash';



export class Album {
    collectionName = "albums";

    // Registrar Artista
    async create(image, name, artist) {
        try {
            // ID del albúm
            const idAlbum = uuidv4();
            // Fecha de creación del albúm
            const create_at = new Date();
            // Datos del albúm
            const data = { id: idAlbum, image, name, artist, create_at };

            // Registramos referencias y los datos en Firestore
            await setDoc(doc(db, this.collectionName, idAlbum), data)
        } catch (error) {
            throw error;
        }
    }

    // Agrupar albumes
    async obtainAll() {
        try {
            const collectionRef = collection(db, this.collectionName);
            const snapshot = await getDocs(collectionRef);
            return map(snapshot.docs, (doc) => doc.data());
        } catch (error) {
            throw error;
        }
    }

    // Obtener un albúm
    async getAlbum(id) {
        try {
            // Buscar artista en base a donde se guarda y su id
            const docRef = doc(db, this.collectionName, id);
            // Obtener datos artista, uso de "lodash"
            const snapshot = await getDoc(docRef);
            return snapshot.data();
        } catch (error) {
           throw error; 
        }
    }

    // Obtener albumes para asociarlos a la página del artista
    async getAlbumToArtist(idAdtist) {
        try {
            // Extraer todos los registros en los que la propiedad "artist" sea igual al "id" del artista
            const whereRef = where("artist", "==", idAdtist);
            // Donde queremos hacer la consulta
            const collectionRef = collection(db, this.collectionName);
            // Ejecutar query, con los datos del where y de laa colección
            const queryRef = query(collectionRef, whereRef);
            // Obtener datos de la query
            const snapshot = await getDocs(queryRef);
            // Obtener los datos por cada documento
            return map(snapshot.docs, (doc)=> doc.data());
        } catch (error) {
            throw error;
        }
    }

   // Obtener últimos albumes
   async getLastsAlbums(limitNumber = 15) {
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
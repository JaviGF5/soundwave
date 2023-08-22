import { setDoc, doc, collection, getDocs, getDoc, orderBy, limit, query } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils';
import { map } from 'lodash';


export class Artist {
    collectioName = "artists";

    // Registrar Artista
    async create(image, name) {
        try {
            // ID de los artistas
            const idArtist = uuidv4();
            // Fecha de creación del artista
            const create_at = new Date();
            // Datos de los artistas
            const data = { id: idArtist, image, name, create_at };

            // Registrar datos en Firestore
            await setDoc(doc(db, this.collectioName, idArtist), data);

        } catch (error) {
            throw error;
        }
    }

    // Agrupar a todos los artistas
    async obtainAll() {
        try {
            // Datos a buscar
            const artistRef = collection(db, this.collectioName);
            // Obtener los datos apoyándonos en 'lodash'
            const snapshot = await getDocs(artistRef);
            return map(snapshot.docs, (doc) => doc.data());
        } catch (error) {
            throw error;
        }
    }

    // Obtener un artista
    async getArtist(id) {
        try {
            // Buscar artista en base a donde se guarda y su id
            const artistRef = doc(db, this.collectioName, id);
            // Obtener datos artista, uso de "lodash"
            const snapshot = await getDoc(artistRef);
            return snapshot.data();
        } catch (error) {
           throw error; 
        }
    }

    // Obtener últimos artistas
    async getLastsArtists(limitNumber = 15) {
        try {
            const collectionRef = collection(db, this.collectioName);
            // Ordenar por fecha de creación
            const orderByRef = orderBy("create_at", "desc");
            // Cuantos Number cargar
            const limitRef = limit(limitNumber);
            // Hacemos la consulta a la Data Base, traemos los datos
            const queryRef = query(collectionRef, orderByRef, limitRef);
            const snapshot = await getDocs(queryRef);

            return map(snapshot.docs, (doc) => doc.data());
        } catch (error) {
            throw error;
        }
    }

}
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';


export class Auth {

    // Register User
    async register(email, password) {
        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw error 
        }
    };

    // Sing out User
    async logout() {
        try {
            const auth = getAuth();
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    };

    // Login User
    async login(email, password) {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw error;
        }
    };
}


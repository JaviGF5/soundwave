import { 
    getAuth, 
    updateProfile, 
    EmailAuthProvider, 
    reauthenticateWithCredential, 
    updateEmail,
    updatePassword,
} from 'firebase/auth';


export class User {

    getMe() {
        return getAuth().currentUser;
    }

    // Actualizar el avatar usuario guardado en la base de datos
    async updateAvatarUser(url) {
        try {
            const auth = getAuth();
            await updateProfile(auth.currentUser, {
               photoURL: url, 
            });
        } catch (error) {
            throw error;
        }
    }
    // Actualizar nombre de usuario, a través de páginas como "Profile"
    async updateUserName(displayName) {
        try {
            const auth = getAuth();
            await updateProfile(auth.currentUser, {
                displayName,
            });
        } catch (error) {
            throw error;
        }
    }

    // Actualizar email de usuario, a través de páginas como "Profile"
    async updateUserEmail(newEmail, password) {
        try {
            const auth = getAuth();

            // Definimos el email
            const email = auth.currentUser.email;
            // Comprobar que la contraseña y email que han pasado son correctas
            const credentials = EmailAuthProvider.credential(email, password);
            // Reautentica el email
            await reauthenticateWithCredential(auth.currentUser, credentials);
            // Actualiza el email
            await updateEmail(auth.currentUser, newEmail); 

        } catch (error) {
            throw error;
        }
    }

    // Actualizar contraseña de usuario, a través de páginas como "Profile"
    async updateUserPassword(password, newPassword) {
        try {
            const auth = getAuth();

            const email = auth.currentUser.email;
            const credentials = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(auth.currentUser, credentials);
            await updatePassword(auth.currentUser, newPassword);
            
        } catch (error) {
            throw error;
        }
    }
}
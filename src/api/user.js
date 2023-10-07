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

    // Update Avatar (Profile Page)
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

    // Update Username (Profile Page)
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

    // Update User Email (Profile Page)
    async updateUserEmail(newEmail, password) {
        try {
            const auth = getAuth();
            const email = auth.currentUser.email;
            // Check 
            const credentials = EmailAuthProvider.credential(email, password);
            // Reauthenticate 
            await reauthenticateWithCredential(auth.currentUser, credentials);
            await updateEmail(auth.currentUser, newEmail); 
        } catch (error) {
            throw error;
        }
    }

    // Update User Password (Profile Page)
    async updateUserPassword(password, newPassword) {
        try {
            const auth = getAuth();
            const email = auth.currentUser.email;
             // Check 
            const credentials = EmailAuthProvider.credential(email, password);
            // Reauthenticate 
            await reauthenticateWithCredential(auth.currentUser, credentials);
            await updatePassword(auth.currentUser, newPassword);
        } catch (error) {
            throw error;
        }
    }
}
import { useState } from 'react';
import './App.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LoggedUser } from './routes'; 
import { Auth } from './pages';
import { PlayerProvider } from './context';

export default function App() {
 

  const [user, setUser] = useState(undefined);

 // Función de Firebase 9, para crear un usuario
  const authentication = getAuth();

  onAuthStateChanged( authentication, (user) => {
    setUser(user);
  })

  if ( user === undefined ) return null;

  // Si el usuario existe va a la pág. de login, si no, a la de autentificación
  return user ?   
    ( <PlayerProvider> <LoggedUser /> </PlayerProvider> ) : 
    ( <Auth /> )

};

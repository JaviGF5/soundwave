import { useState } from 'react';
import './App.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LoggedUser } from './routes/LoggedUser'; 
import { Auth } from './pages';
import { PlayerProvider } from './context';

export default function App() {
 

  const [user, setUser] = useState(undefined);

 // Firebase 9, Create User
  const authentication = getAuth();

  onAuthStateChanged( authentication, (user) => {
    setUser(user);
  })

  if ( user === undefined ) return null;

  // If the user exists, log in
  return user ?   
    ( <PlayerProvider> <LoggedUser /> </PlayerProvider> ) : 
    ( <Auth /> )

};

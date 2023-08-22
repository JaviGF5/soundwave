import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home, Album, Albums, Artist, Artists, Profile } from '../pages';
import { LoggedLayout } from '../layouts';

// Navegación para usuarios loggeados
export function LoggedUser() {
  
  return (
    
    // Uso de React Router -> crear enlaces o redirigir sin hacer nuevas peticiones al servidor
    <div>
    <BrowserRouter>
      <LoggedLayout>
      <Routes>
        
          <Route path="/" element={ <Home /> } />

          <Route path="/albums" element={ <Albums /> } />
          <Route path="/albums/:id" element={ <Album /> } />

          <Route path="/artists" element={ <Artists /> } />
          <Route path="/artists/:id" element={ <Artist /> } />

          <Route path="/profile" element={ <Profile /> } />

        </Routes>
      </LoggedLayout>
    </BrowserRouter>
    </div>
  )
};

import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home, Album, Albums, Artist, Artists, Profile } from '../pages';
import { LoggedLayout } from '../layouts';

// Open Session Navigation
export function LoggedUser() {
  
  // Create or redirect links, using 'react-router-dom'
  return (
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
  )
};

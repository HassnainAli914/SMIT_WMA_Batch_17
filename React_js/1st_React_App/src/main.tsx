import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import Routers from './Routers.tsx';
import SignProvider from './components/SignProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SignProvider>
        <Routers />
      </SignProvider>
    </BrowserRouter>
  </React.StrictMode>
)

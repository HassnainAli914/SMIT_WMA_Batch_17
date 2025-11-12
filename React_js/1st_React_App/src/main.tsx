import React from 'react';
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import Routers from './Routers.tsx';
import SignProvider from './components/SignProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <SignProvider>
        <Routers />
      </SignProvider>
    </HashRouter>
  </React.StrictMode>
)

import { Fragment } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import "./index.scss";
import { Routingdata } from './common/routingdata';

import App from './layout/App';















import Scrolltotop from './Scrolltotop';

// Lógica de Global Café
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import LoginPage from './pages/auth/login/Containers/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import { Toaster } from 'react-hot-toast';

// Páginas de Impresión (sin layout, sin ProtectedRoute)
import BoletaPesadaPage from './pages/recepcion/bascula/print/BoletaPesadaPage';
import PaseSalidaPage from './pages/recepcion/bascula/print/PaseSalidaPage';

//Form
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Fragment>
    <HelmetProvider>
      <AuthProvider>
      <BrowserRouter>
      <Scrolltotop/>
        <Routes>
          {/* main layout */}
          <Route path={`${import.meta.env.BASE_URL}`} element={<ProtectedRoute><App /></ProtectedRoute>} >
            <Route path={`${import.meta.env.BASE_URL}`} element={<DashboardPage />} />
            {Routingdata.map((idx) => (
              <Route path={idx.path} element={idx.element} key={Math.random()} />
            ))}
          </Route>
          {/* authentication layout */}
          
          {/* Tu Ruta de Login */}
          <Route path={`${import.meta.env.BASE_URL}login`} element={<LoginPage />} />

          {/* Rutas de impresión (sin sidebar/navbar, usan token de localStorage) */}
          <Route path={`${import.meta.env.BASE_URL}print/boleta-pesada/:idDetalle/:tipo`} element={<BoletaPesadaPage />} />
          <Route path={`${import.meta.env.BASE_URL}print/pase-salida/:idDetalle`} element={<PaseSalidaPage />} />

        </Routes>
      </BrowserRouter>
      
      {/* Notificaciones Globales */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#1e293b', color: '#fff' },
        }}
      />
      </AuthProvider>
    </HelmetProvider>
  </Fragment>
);

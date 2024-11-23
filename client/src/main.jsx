import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import App from './App';
import Homepage from './Page/Homepage';
import Login from './Page/Login';
import Register from './Page/Register';
import Dashboard from './Page/Dashboard'; 
import Connect from './Page/Connect';
import CardsPage from './Page/Ownc';
import DetailsPage from './Page/owncc';
<<<<<<< HEAD
import Appp from './Popup';
import AlertsPage from './Page/AlertsPage';
=======
import Scanransome from './Page/Scanransome';
>>>>>>> 6e427f23d98beeef6a455ae7261a4e7a0ef14721

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      
      <Route path="/" element={<App />}>
        <Route index element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="card" element={<CardsPage />} />
        <Route path="card1" element={<DetailsPage />} />
<<<<<<< HEAD
        <Route path="alerts" element={<AlertsPage />} />
=======
        <Route path='scanransome' element={<Scanransome/>} />
>>>>>>> 6e427f23d98beeef6a455ae7261a4e7a0ef14721
      </Route>
      <Route path='/dashboard' element={<App/>}>
      <Route index element={<Dashboard />} /> 
      <Route path='connect' element={<Connect/>}/>
      
      </Route>
      <Route path="*" element={<App />} /> 
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

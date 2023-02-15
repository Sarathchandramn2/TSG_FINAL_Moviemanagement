import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// Importing all the component that will be used as routes
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Movies from '../../pages/Movies/Movies';
import Manage from '../../pages/manage/Manage';
import Register from '../../pages/Register/Register';
import Homeuser from '../../pages/Homeuser/Homeuser';
import Homesuser from '../../pages/Homesuser/Homesuser';
const AppRoutes = () => {
    const role = sessionStorage.getItem('usertype');
  // Return the routes for the application
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/home' element={role === '2' ? <Home /> : <Navigate to='/' />} />
            <Route path='/movies' element={role === '2' ? <Movies /> : <Navigate to='/' />} />
            <Route path='/manage' element={role === '2' ? <Manage /> : <Navigate to='/' />} />
            <Route path='/homeuser' element={role === '3' ? <Homeuser /> : <Navigate to='/' />} />
            <Route path='/homes' element={role === '3' ? <Homesuser /> : <Navigate to='/' />}/>


        </Routes>
    );
};

export default AppRoutes;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import EditarUsuario from './pages/editar-usuario';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/login" element={<Login />} />
            <Route index path="/dashboard" element={<Dashboard />} />
            <Route index path="/editar-usuario" element={<EditarUsuario />} />

          </Routes>
        </Router>

    </div >
  );
}

export default App;

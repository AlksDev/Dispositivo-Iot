import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Menu from './Pages/Menu/Menu';
import InicioComponent from './Pages/Inicio/Inicio';
import Dispositivo from './Pages/Dispositivo/Dispositivo';
import './App.css';

function App() {

const [conectado, setConectado] = useState(true); // Estado para saber si el usuario está conectado
  const navigate = useNavigate(); // Obtiene la función de navegación

  const acceder = (estado) => {
    setConectado(estado);
  };

  const handleLogin = async () => {
    acceder(true);
    navigate('/'); // Redirige al usuario a la ruta "/about" después del inicio de sesión
  };

  const handleLogout = () => {
    setConectado(false);
    localStorage.removeItem('loggedInUser'); // Elimina los datos de sesión almacenados
};

  return (
    <div className={conectado ? 'flex-container' : 'block-container'}>
    {conectado && <Navbar handleLogout={handleLogout} />}
      {/* Renderiza las rutas solo si el usuario está conectado */}
      {conectado && (
        <Routes>
          <Route path="/" element={<InicioComponent />} /> 
          <Route path="/Inicio" element={<InicioComponent />} />
          <Route path='/Menu' element={<Menu />} />
          <Route path='/Dispositivo' element={<Dispositivo />} />
        </Routes>
      )}

      {/* Renderiza el componente Login solo si el usuario no está conectado */}
      {!conectado && <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;

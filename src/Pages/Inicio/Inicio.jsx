import React, { useState, useEffect } from 'react';
import './Inicio.css';
import ControlesDispositivos from '../../components/card/ControlesDispositivos';
import Loading from '../../components/Loading';

function Inicio() {
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = (nombre) => {
    setNombreUsuario(nombre);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="Inc">
      {loading ? (
        <Loading />
      ) : (
        <div className="Inc">
          <h1 className='nombre'>Bienvenido al Servidor IoT para Control de Tanques de Agua</h1>
          <div className="texto-informativo">
            <p>
              Nuestro servidor IoT basado en ESP ofrece una solución eficiente y automatizada para el control de niveles de agua en tanques, brindando una gestión inteligente y remota del suministro de agua.
            </p>
            <p>
              Diseñado para simplificar el monitoreo y garantizar un suministro constante de agua, nuestro sistema utiliza tecnologías para ofrecer un control preciso y una experiencia sin complicaciones.
            </p>
            <p>
              Con características como control preciso, automatización inteligente y acceso remoto a través de una interfaz web intuitiva y segura, nuestro servidor IoT para control de tanques de agua optimiza el uso de energía y garantiza un suministro eficiente y confiable.
            </p>
          </div>
          
          <iframe className='bg-light mx-auto px-2 border border-2 border-primary ma tra' style={{ width: "500px", height: "260px" }}
            title="Thingspeak Chart"
            width="500"
            height="260"
            src="https://thingspeak.com/channels/2347639/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=spline"
            allowFullScreen
          ></iframe>
          <div>{/* Aquí puedes agregar más contenido si es necesario */}</div>
        </div>
      )}
    </div>
  );
}

export default Inicio;

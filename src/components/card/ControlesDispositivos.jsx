import React from 'react';

const ControlesDispositivos = ({ dispositivos, connected, abrirCerrarModalInsertar, sendRequest }) => {
  return (
    <div className='controles'>
      <div className='Botones-manejo'>
        {dispositivos.map((dispositivo) => (
          <div key={dispositivo.id} className='dispositivo'>
            <div className="estados-dispositivos">
              <h4>Estado: {connected ? 'Conectado' : 'Desconectado'}</h4>
              <p className={connected ? 'status-connected' : 'status-error'}></p>
            </div>
            <h3>{dispositivo.nombre}</h3>
            <p>IP: {dispositivo.ip}</p>
            <button onClick={() => sendRequest('ON', dispositivo.ip)} className="filter-button ON Boton-movil">Conectar</button>
            <button onClick={() => sendRequest('OFF', dispositivo.ip)} className="filter-button OFF Boton-movil">Desconectar</button>
            <button onClick={() => sendRequest('BLINK', dispositivo.ip)} className="filter-button BLINK Boton-movil">Reiniciar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlesDispositivos;

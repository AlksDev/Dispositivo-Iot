// import React, { useState } from 'react';
// import './Dispositivos.css';
// const App = () => {
//   const [status, setStatus] = useState('');

//   const dispositivos = [
//     {
//       id: 1,
//       nombre: 'LED',
//       estado: 'ON',
//       ip: '192.168.0.10',//192.168.1.6
//     },
//     {
//       id: 1,
//       nombre: 'LED',
//       estado: 'ON',
//       ip: '192.168.0.10',//192.168.1.6
//     },
//     {
//       id: 1,
//       nombre: 'LED',
//       estado: 'ON',
//       ip: '192.168.0.10',//192.168.1.6
//     },
//     {
//       id: 1,
//       nombre: 'LED',
//       estado: 'ON',
//       ip: '192.168.0.10',//192.168.1.6
//     },
//     {
//       id: 1,
//       nombre: 'LED',
//       estado: 'ON',
//       ip: '192.168.0.10',//192.168.1.6
//     },
//   ];
//   const sendRequest = async (command, ip) => {
//     try {
//       const response = await fetch(`http://${ip}/LED=${command}`);//192, 168, 0, 10
//       const data = await response.text();
//       // setStatus('Error de conexion ');
//       setStatus(data === 'Conectado' ? 'Error de conexión' :'Conectado' );

//       setStatus(data);
//     } catch (error) {
//       console.error('Error sending request:', error);
//       setStatus('Conectado');
//     }
//   };
//   return (
//     <div className='Dispositivos-inicio'>

//       <h1>Dispositivos </h1>
//       <h2>Control de dispositivos</h2>
//       <div className='controles'>
//         <div className='Botones-manejo'>
//           {dispositivos.map((dispositivo) => (
//             <div key={dispositivo.id} className='dispositivo'>
//               <div className="estados-dispositivos">
//                 <h4>
//                 Estado:{/*  {status} */}
//                 </h4>
//                 <p className={status === 'Conectado' ?  'status-error':'status-connected' }></p>
//               </div>
//               <h3>{dispositivo.nombre}</h3>
//               <p>IP: {dispositivo.ip}</p>
//               <button onClick={() => sendRequest('ON', dispositivo.ip)} className="filter-button ON Boton-movil">Encender </button>
//               <button onClick={() => sendRequest('OFF', dispositivo.ip)} className="filter-button OFF Boton-movil">Apagar </button>
//               <button onClick={() => sendRequest('BLINK', dispositivo.ip)} className="filter-button BLINK Boton-movil">Reiniciar </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
      
// <div>
        

// <button className="btn btn-secondary" onClick={abrirCerrarModalInsertar}>
//     Agregar
//   </button>
//   <button className="btn btn-primary" onClick={() => editarDispositivo({ /*datos actualizados*/ })}>
//     Editar
//   </button>
//   <button className="btn btn-danger">
//     Eliminar
//   </button>
// </div>
// <Modal isOpen={modalInsertarVisible} toggle={abrirCerrarModalInsertar}>
//   <ModalHeader>Insertar Dispositivo</ModalHeader>
//   <ModalBody>
//     <div className="form-group">
//       <label>Nombre:</label>
//       <br />
//       <input
//         type="text"
//         className="form-control"
//         name="nombre"
//         value={nuevoDispositivo.nombre}
//         onChange={handleChange}
//       />
//       <br />
//       <label>Estado:</label>
//       <br />
//       <input
//         type="text"
//         className="form-control"
//         name="estado"
//         value={nuevoDispositivo.estado}
//         onChange={handleChange}
//       />
//       <br />
//       <label>IP:</label>
//       <br />
//       <input
//         type="text"
//         className="form-control"
//         name="ip"
//         value={nuevoDispositivo.ip}
//         onChange={handleChange}
//       />
//       <br />
//       <label>Código:</label>
//       <br />
//       <input
//         type="text"
//         className="form-control"
//         name="codigo"
//         value={nuevoDispositivo.codigo}
//         onChange={handleChange}
//       />
//       <br />
//     </div>
//   </ModalBody>
//   <ModalFooter>
//     <button className="btn btn-primary" onClick={insertarDispositivo}>
//       Insertar
//     </button>{" "}
//     <button className="btn btn-danger" onClick={abrirCerrarModalInsertar}>
//       Cancelar
//     </button>
//   </ModalFooter>
// </Modal>
// export default App;

import React, { useState } from 'react';
import './Dispositivos.css';
import ControlesDispositivos from '../card/ControlesDispositivos';
const App = () => {
  const [connected, setConnected] = useState(true);
  const [modalInsertarVisible, setModalInsertarVisible] = useState(false); // Renombrado para evitar conflictos
  const [dispositivos, setDispositivos] = useState([
    {
      id: 1,
      nombre: 'Llenado de Tanque',
      estado: 'OFF',
      ip: '192.168.1.6',
    },
    
  ]);

  const sendRequest = async (command, ip) => {
    try {
      if (command === 'OFF') {
        setConnected(false); 
        setStatus('Desconectado');
        return;
      }

      setConnected(false); // Marcar como desconectado antes de un encendido o reinicio

      const response = await fetch(`http://${ip}`);
      const data = await response.text();

      alert(data === 'Conectado' ? 'Conectado' : 'Error de conexión');
      setConnected(true); // Marcar como conectado después de un encendido o reinicio
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Proceso realizado');
      setConnected(false); // Marcar como desconectado en caso de error
    }
  };


  const abrirCerrarModalInsertar = () => {
    setModalInsertarVisible(!modalInsertarVisible); // Cambiar el estado al contrario del estado actual
  };

  return (
    <div className='Dispositivos-inicio'>
     <h1>Dispositivo </h1>
      <ControlesDispositivos
        dispositivos={dispositivos}
        connected={connected}
        abrirCerrarModalInsertar={abrirCerrarModalInsertar}
        sendRequest={sendRequest}
      />

    </div>
  );
};

export default App;

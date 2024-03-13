import React, { useState, useEffect } from 'react';
import './Dispositivo.css';
import Dispositivos from '../../components/Dispositivos/Dispositivos';
import Diagrama from '../../components/Diagramas/LinesChart/Diagrama';
import Loading from '../../components/Loading';

export default function Dispositivo() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div >
      {loading ? (
        <div className='carga'>     
             <Loading />

        </div>
      ) : (
        <div className='Dispositivo'>
           <div className="vista-dispositivo">
          <div className="diagrama">
              <iframe className='bg-light mx-auto px-2 border border-2 border-primary ma tra' style={{ width: "450px", height: "260px" }}
                title="Thingspeak Chart"
                width="500"
                height="260"
                src="https://thingspeak.com/channels/2347639/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=spline"
                allowFullScreen
              ></iframe>
          </div>
          <div className="Di">

          <Dispositivos  />
          </div>
        </div>
        </div>
       
      )}
    </div>
  );
}

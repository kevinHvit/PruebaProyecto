"use client"
import React, { useCallback, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import '../firebase/config';

const Aplicacion = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, 'rutas');
        const docSnapshot = await getDocs(queryCollection);
        const data = docSnapshot.docs.map(i=>({id:i.id,...i.data()}));
        /*if (docSnapshot.exists()) {
          const docData = docSnapshot.data();
          console.trace('Valor del documento:', docData);
        } else {
          console.trace('El documento no existe.');
        }*/


        //console.log(data.map(i=>({})));
        //console.log("valor del precio");
        //console.log(data[0].precio);
      } catch (error) {
        console.error('Error al recuperar los datos:', error);
      }
    };

    fetchData();
  }, []);

  return <div></div>;
};

export default Aplicacion;

import React, { useState } from 'react';
import * as admin from 'firebase-admin';
import 'firebase/firestore';
  //---------------------------------------------------------------------------
/*
ESTAS LINEAS SON PARA LA INICIALIZACIÓN DE LA BASE EN MODO ADMIN
NOS PERMITE PODER ENVIAR DATOS
*/

// Inicializa la aplicación Firebase Admin
const serviceAccount = require('/adminsdkev');
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

async function enviarDocumentoAColeccion(coleccion: string, datosDocumento: any) {
  try {
    const db = admin.firestore();
    const collectionRef = db.collection(coleccion);
    const nuevoDocumentoRef = collectionRef.doc(); // Crea un nuevo documento con un ID autogenerado

    await nuevoDocumentoRef.set(datosDocumento);

    console.log('Documento enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el documento:', error);
  }
}
//-----------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------
/*
ESTAS LINEAS SON LAS QUE LLAMN LA FUNCION Y PERMITEN EL ENVIO DE LOS DATOS QUE SE INDIQUEN
*/
// Uso de la función para enviar un documento a una colección específica
const coleccion = 'pruebaEnvio';
const datosDocumento = {
  // Datos del documento que deseas enviar
  edad: 17,
  nombre: 'ARE',
};
enviarDocumentoAColeccion(coleccion, datosDocumento)
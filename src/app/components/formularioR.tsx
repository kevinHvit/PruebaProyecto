import React, { useState } from 'react';
import Link from 'next/link';
import 'firebase/firestore';
import '../globals.css';
import * as admin from 'firebase-admin';

export default function FormDat() {
  const [formArray, setFormArray] = useState([{ id: 1, formData: '' }]); // Estado para realizar un seguimiento de los formularios generados
  const [select1Value, setSelect1Value] = useState('');
  const [select2Value, setSelect2Value] = useState('');
  const [select3Value, setSelect3Value] = useState('');
  const [select2Enabled, setSelect2Enabled] = useState(false);
  const [select3Enabled, setSelect3Enabled] = useState(false);
  const [value, setValue] = useState("");

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
//-----------------------------------------------------------------------------------------------
  const handleSelect1Change = (event: any) => {
    const selectedValue = event.target.value;
    setSelect1Value(selectedValue);

    // Habilitar el select2 si select1 tiene una selección específica
    if (selectedValue === 'Video') {
      setSelect2Enabled(true);
    } else {
      setSelect2Value('');
      setSelect2Enabled(false);
      if (selectedValue === 'Imagen') {
        setSelect3Enabled(true);
      } else {
        setSelect3Enabled(false);
        setSelect3Value('');
      }

    }
  };

  const handleSelect2Change = (event: any) => {
    const selectedValue = event.target.value;
    setSelect2Value(selectedValue);
  };
  const handleSelect3Change = (event: any) => {
    const selectedValue = event.target.value;
    setSelect3Value(selectedValue);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Realizar acciones adicionales con los valores seleccionados en los select
  };

  const addForm = () => {
    const newFormId = formArray.length + 1;
    setFormArray((prevForms) => [
      ...prevForms,
      { id: newFormId, formData: '' },
    ]); // Agregar un nuevo formulario al array
  };

  const removeForm = (id: number) => {
    if (formArray.length === 1 || id === 1) {
      return; // No eliminar si hay solo un formulario o si es el primer formulario
    }

    setFormArray((prevForms) =>
      prevForms.filter((form) => form.id !== id) // Eliminar el formulario con el ID dado
    );
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value } = e.target;
    setFormArray((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, formData: value } : form
      ) // Actualizar los datos del formulario con el ID dado
    );
  };

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 2) {
      setValue(inputValue);
    }
  };

  const handleKeyPress = (e: any) => {
    const inputValue = e.target.value;
    if (inputValue.length >= 2) {
      e.preventDefault();
    }
  };

  return (
    <div className="container-form">
      {formArray.map((form) => (
        <div className="container-form" key={form.id}>
          <form className="form-cot">
            <h2>Cotización de servicios  {form.id}</h2>

            <section className="datos-empresa-form">
              <h3>Información de la empresa</h3>
              <br />

              <p>Ingrese el nombre de su empresa</p>
              <input
                type="text"
                placeholder="Ingrese el nombre de su empresa"
                autoComplete="off"
                id="text1-form"
                onChange={(e) => handleFormChange(e, form.id)}
                required
              ></input>

              <p>Correo electrónico de la empresa</p>
              <input
                type="text"
                placeholder="Ingrese el correo electrónico de la empresa"
                autoComplete="off"
                id="text1-form"
                onChange={(e) => handleFormChange(e, form.id)}
                required
              ></input>

              <p>Ingrese el teléfono de su empresa</p>
              <input
                type="text"
                placeholder="Ingrese el teléfono de su empresa"
                autoComplete="off"
                id="text1-form"
                onChange={(e) => handleFormChange(e, form.id)}
                required
              ></input>
            </section>

            <section className="datos-empresa-form">
              <h3>Datos para la cotización</h3>
              <br />

              <div className="section-cotizacion">
                <p>Seleccione el tipo de anuncio requerido</p>
                <br />
                <select value={select1Value} onChange={handleSelect1Change} className="input-detalles" required>
                  <option value="Video">Video</option>
                  <option value="Imagen">Imagen</option>
                  <option value="Gif">Gif</option>
                  <option value="Marquesina">Marquesina</option>
                  <option value="Texto">Texto</option>
                </select>
              </div>

              {select2Enabled && (
                <div className="section-cotizacion">
                  <p>Seleccione la calidad de video deseada</p>
                  <br />
                  <select value={select2Value} onChange={handleSelect2Change} className="input-detalles" required>
                    <option value="2">QHD</option>
                    <option value="4">FHD 1080p</option>
                    <option value="5">2K</option>
                    <option value="6">UHD 4K</option>
                    <option value="7">UHD 8K</option>
                  </select>
                </div>
              )}

              {select3Enabled && (
                <div className="section-cotizacion">
                  <p>Seleccione la calidad de imagen deseada</p>
                  <br />
                  <select value={select3Value} onChange={handleSelect3Change} className="input-detalles" required>
                    <option value="1">SD</option>
                    <option value="2">QHD</option>
                    <option value="3">HD 720p</option>
                    <option value="4">FHD 1080p</option>
                    <option value="5">2K</option>
                    <option value="6">UHD 4K</option>
                    <option value="7">UHD 8K</option>
                  </select>
                </div>
              )}

              <div className="section-cotizacion">
                <p>Seleccione la ruta deseada para el anuncio</p>
                <br />
                <select name="" className="input-detalles" required>
                  <option value="">Golfito - Neily</option>
                  <option value="">Golfito - Pavon</option>
                  <option value="">Golfito - Rio Claro</option>
                  <option value="">Dominical - Neily</option>
                  <option value="">Jimenez - San Jose</option>
                  <option value="">Neily - San Vito</option>
                </select>
              </div>

              <div className="section-cotizacion">
                <p>Seleccione la cantidad de tiempo para el anuncio</p>
                <br />
                <input
                  type="number"
                  id="numero_reps"
                  name="numero_reps"
                  min="1"
                  max="99"
                  onKeyPress={handleKeyPress}
                  onChange={(e) => setValue(e.target.value)}
                  pattern="\d{1,2}"
                  placeholder="selecciona una cantidad"
                  required
                  className='input-tiempo'
                />
              </div>
            </section >
          </form>

          <div className="div-buttons-form">
            <button className="button-container-form" onClick={addForm}>
              Agregar formulario
            </button>
            {formArray.length > 1 && (
              <button
                className="button-container-form"
                onClick={() => removeForm(form.id)}
              >
                Eliminar formulario
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

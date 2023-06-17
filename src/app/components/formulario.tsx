"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import "firebase/firestore";
import "../globals.css";
import "../firebase/config";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function Form_datos() {
  const [rutas, setRutas] = useState([]);
  //const [prueba, setPrueba] = useState(0);


  const [datos, setDatos] = useState({
    nombre_empresa: "",
    numero_reps: "",
    duracion_video: "",
    calidad: "",
    rutas: "",
    direccion: "",
  });

  const enviarDatos = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const price_r = getPriceRute(Number(datos.rutas));

    //setPrueba(prueba)
    setDatos({

      rutas: datos.rutas,
      nombre_empresa: datos.nombre_empresa,
      numero_reps: datos.numero_reps,
      duracion_video: datos.duracion_video,
      calidad: datos.calidad,
      direccion: price_r + "",
    });
    console.log(datos);
  };

  const handleInputChange = (
    event:
      | React.FormEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {

    setDatos({
      ...datos,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, "rutas");
        const docSnapshot = await getDocs(queryCollection);
        const data = docSnapshot.docs.map((i) => ({
          id: i.id,
          ...i.data(),
        })) as any;

        console.log(data);

        setRutas(data);
      } catch (error) {
        console.error("Error al recuperar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const getPriceRute = (id: number) => {
    const ruta: any = rutas.find((i: any) => i.id == id)!;
    const valueRute = ruta.precio;
    const repVideo = Number(datos.numero_reps);

    const total = valueRute * repVideo;
    return total;
  };

  const handleKeyPress = (e: any) => {
    const inputValue = e.target.value;
    const keyPressed = e.key;
    const isNegative = inputValue.startsWith('-');

    if (isNegative && keyPressed === '-') {
      e.preventDefault(); // Evita escribir un segundo signo negativo
    } else if (isNaN(Number(keyPressed)) && keyPressed !== 'Backspace') {
      e.preventDefault(); // Evita escribir cualquier carácter que no sea un número o la tecla de retroceso
    } else if (inputValue.length >= 2 && !isNegative) {
      e.preventDefault(); // Evita escribir más caracteres si no es un número negativo
    }
  };

  return (

    <form className="form-cot" onSubmit={enviarDatos}>
      <h2>Cotización de servicios</h2>

      <section className="datos-empresa-form">
        <h3>Información de la empresa</h3>

        <p>Ingrese el nombre de su empresa</p>
        <input
          type="text"
          id="nombre_empresa"
          className="text1-form"
          name="nombre_empresa"
          placeholder="Ingrese el nombre de su empresa"
          autoComplete="off"
          required
          onChange={handleInputChange}
          value={datos.nombre_empresa}
        />

        <p>Correo electrónico de la empresa</p>
        <input
          type="text"
          placeholder="Ingrese el correo electrónico de la empresa"
          autoComplete="off"
          className="text1-form"
          onChange={handleInputChange}
          required
        ></input>

        <p>Ingrese el teléfono de su empresa</p>
        <input
          type="text"
          placeholder="Ingrese el teléfono de su empresa"
          autoComplete="off"
          className="text1-form"
          onChange={handleInputChange}
          required
        ></input>
      </section>

      <section className="datos-empresa-form">
        <h3>Datos para la cotización</h3>

        <div className="section-cotizacion">
          <p>Seleccione el tipo de anuncio requerido</p>
          <select value="" className="input-detalles" required>
            <option value="Video">Video</option>
            <option value="Imagen">Imagen</option>
            <option value="Gif">Gif</option>
            <option value="Marquesina">Marquesina</option>
            <option value="Texto">Texto</option>
          </select>
        </div>

        <div className="section-cotizacion">
          <p>Seleccione la calidad del anucio deseada</p>
          <select name="calidad"
            id="calidad"
            onChange={handleInputChange}
            value={datos.calidad}
            className="input-detalles"
            required>
            <option value="1">FHD 1080p</option>
            <option value="2">2K</option>
            <option value="3">UHD 4K</option>
          </select>
        </div>

        <div className="section-cotizacion">
          <p>Seleccione la duracion del anucio deseada</p>
          <input
            type="number"
            id="duracion_video"
            className='input-tiempo'
            name="duracion_video"
            min="1"
            max="99"
            pattern="\d{1,2}"
            placeholder="selecciona una cantidad"
            required
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
            value={datos.duracion_video}
          />
        </div>

        <div className="section-cotizacion">
          <p>Seleccione el número de repeticiones deseada</p>
          <input
            type="number"
            id="numero_reps"
            className='input-tiempo'
            name="numero_reps"
            min="1"
            max="99"
            pattern="\d{1,2}"
            placeholder="selecciona una cantidad"
            required
            onKeyPress={handleKeyPress}
            onChange={handleInputChange}
            value={datos.numero_reps}
          />
        </div>

        <div className="section-cotizacion">
          <p>Seleccione la ruta deseada</p>
          <select name="rutas"
            id="rutas"
            onChange={handleInputChange}
            value={datos.rutas}
            className="input-detal-rut"
            required
          >
            {rutas.map((ruta: any) => (
              <option key={ruta.id} value={ruta.id}>
                {ruta.nombre}
              </option>
            ))}
          </select>
          <div />
        </div>

        <div className="section-cotizacion">
          <p>Precio de la cotización</p>
          <textarea
            id="direccion"
            name="direccion"
            className="text-precio"
            placeholder="Precio total es: "
            disabled
            onChange={handleInputChange}
            value={datos.direccion}
          ></textarea>
          <br />
        </div>

        <div className="section-cotizacionB">
        <button id="Send" type="submit" className="buttonEnviar">
          Registrar Cotización
          </button>
        </div>

        <div className="section-cotizacion">
          <p>Cotizaciones realizadas</p>
          <input type="text" className="text-cotizciones" disabled>

          </input>
        </div>

        <div className="section-cotizacionB">
          <button id="Send" type="submit" className="buttonEnviar">
            Enviar datos
          </button>
        </div>
      </section>
    </form >

  );
}

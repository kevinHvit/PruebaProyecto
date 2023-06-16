"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import "firebase/firestore";
import "../globals.css";
import "../firebase/config";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function Form_datos() {
  const [rutas, setRutas] = useState([]);

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

  return (
    <form onSubmit={enviarDatos}>
      <div className="Formulario">
        <label htmlFor="tipo_usuario">Ingreso de anuncios</label>

        <div>
          <label htmlFor="nombre_empresa">Nombre de la empresa:</label>
          <input
            type="text"
            id="nombre_empresa"
            name="nombre_empresa"
            placeholder="ingresa un nombre"
            required
            onChange={handleInputChange}
            value={datos.nombre_empresa}
          />

          <label htmlFor="numero_reps">numero de repeticiónes(segundos)</label>
          <input
            type="number"
            id="numero_reps"
            name="numero_reps"
            min="1"
            max="99"
            pattern="\d{1,2}"
            placeholder="selecciona una cantidad"
            required
            onChange={handleInputChange}
            value={datos.numero_reps}
          />

          <label htmlFor="duracion_video">duracion del video</label>
          <input
            type="number"
            id="duracion_video"
            name="duracion_video"
            min="1"
            max="99"
            pattern="\d{1,2}"
            placeholder="selecciona una cantidad"
            required
            onChange={handleInputChange}
            value={datos.duracion_video}
          />

          <br />
          <br />
          <label htmlFor="opciones_calidad">Seleccione la calidad: </label>
          <select name="calidad" 
          id="calidad" 
          onChange={handleInputChange}
          value={datos.calidad}
          >
            <option value="1">Video calidad: 720p </option>
            <option value="2">Video calidad: 4K </option>
          </select>

          <div className="rutas_cont">
            <label htmlFor="opciones_rutas">Seleccione la ruta: </label>

            <select name="rutas" 
            id="rutas" 
            onChange={handleInputChange}
            value={datos.rutas}
            >
              {/*<option >Ciudad Neily-Golfito </option>
            <option value="2">Paso Canoas-Golfito </option>
            <option value="3">Neily-Paso-Canoas </option>
            <option value="4">Palmar Norte-Río claro </option>*/}

              {rutas.map((ruta: any) => (
                <option key={ruta.id} value={ruta.id}>
                  {ruta.nombre}
                </option>
              ))}
            </select>

            <div />
          </div>

          <label htmlFor="precio_calculado">Precio:</label>
          <textarea
            id="direccion"
            name="direccion"
            placeholder="precio total es: "
            disabled
            onChange={handleInputChange}
            value={datos.direccion}
          ></textarea>
          <br />
          <button id="Send" type="submit">
            Enviar datos
          </button>
        </div>
      </div>
    </form>
  );
}

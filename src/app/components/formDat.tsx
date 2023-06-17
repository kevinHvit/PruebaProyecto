"use client";
import React, { useState } from 'react';

const Formulario = () => {
  const [empresa, setEmpresa] = useState('');
  const [repeticiones, setRepeticiones] = useState('');
  const [duracion, setDuracion] = useState('');
  const [ruta, setRuta] = useState('');
  const [calidad, setCalidad] = useState('');
  const [resultado, setResultado] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // Aquí puedes realizar cualquier lógica adicional con los valores recopilados

    // Actualizar el campo de resultado con los valores seleccionados
    setResultado(
      `Nombre de empresa: ${empresa}\nNúmero de repeticiones: ${repeticiones}\nDuración de videos: ${duracion}\nRuta seleccionada: ${ruta}\nCalidad seleccionada: ${calidad}`
    );
  };

  return (
    <div>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de empresa:
          <textarea value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
        </label>
        <br />
        <label>
          Número de repeticiones:
          <textarea value={repeticiones} onChange={(e) => setRepeticiones(e.target.value)} />
        </label>
        <br />
        <label>
          Duración de videos:
          <textarea value={duracion} onChange={(e) => setDuracion(e.target.value)} />
        </label>
        <br />
        <label>
          Seleccione ruta:
          <select value={ruta} onChange={(e) => setRuta(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="Ruta 1">Ruta 1</option>
            <option value="Ruta 2">Ruta 2</option>
            <option value="Ruta 3">Ruta 3</option>
          </select>
        </label>
        <br />
        <label>
          Seleccione calidad:
          <select value={calidad} onChange={(e) => setCalidad(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="Calidad 1">Calidad 1</option>
            <option value="Calidad 2">Calidad 2</option>
            <option value="Calidad 3">Calidad 3</option>
          </select>
        </label>
        <br />
        <textarea value={resultado} readOnly />
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
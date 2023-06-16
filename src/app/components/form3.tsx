"use client"
import React, { useState } from 'react';

const MyForm = () => {
  const [number1, setNumber1] = useState<number | ''>('');
  const [number2, setNumber2] = useState<number | ''>('');
  const [sum, setSum] = useState<number | undefined>(undefined);

  const handleNumber1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber1(Number(event.target.value));
  };

  const handleNumber2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber2(Number(event.target.value));
  };

  const handleSubmit = () => {

    const result =  Number(number1) + Number(number2);
    setSum(result);
    alert(`La suma de ${number1} y ${number2} es: ${result}`);
  };

  return (
    <div>
      <input type="number" value={number1} onChange={handleNumber1Change} placeholder="Ingrese el primer número" />
      <input type="number" value={number2} onChange={handleNumber2Change} placeholder="Ingrese el segundo número" />
      <button type="button" onClick={handleSubmit}>Sumar</button>
      {sum !== undefined && <p>La suma es: {sum}</p>}
    </div>
  );
};

export default MyForm;

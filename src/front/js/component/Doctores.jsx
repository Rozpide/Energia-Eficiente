import React from 'react';

const data = [
  { id: 1, name: 'Doctor 1' },
  { id: 2, name: 'Doctor 2' },
  { id: 3, name: 'Doctor 3' },
  { id: 4, name: 'Doctor 4' },
  { id: 5, name: 'Doctor 5' },
  { id: 6, name: 'Doctor 6' },
  { id: 7, name: 'Doctor 7' },
  { id: 8, name: 'Doctor 8' },
  { id: 9, name: 'Doctor 9' },
  { id: 10, name: 'Doctor 10', descripcion:"hola" },
];

const Doctores = () => {
  return (
    <div>
      <h1>Lista de Doctores</h1>
      <ul>
        {data.map((doctor) => (<h2 key={doctor.id}>
          <li >{doctor.name}</li>
          <img src={doctor.foto} alt="icon.img" /><li>{doctor.descripcion}</li></h2
          >
          
        ))}
      </ul>
    </div>
  );
};

export default Doctores;
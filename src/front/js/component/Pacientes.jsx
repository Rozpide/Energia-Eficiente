import React from 'react';

const data = [
  { id: 1, name: 'Paciente' },
  { id: 2, name: 'Paciente' },
  { id: 3, name: 'Paciente' },
];

const Pacientes = () => {
  return (
    <div>
      <h1>Lista de Pacientes</h1>
      <ul>
        {data.map((paciente) => (
          <li key={paciente.id}>{paciente.name}</li>
        ))}
      </ul>
    </div>
  );
};
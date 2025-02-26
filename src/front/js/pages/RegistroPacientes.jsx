import React, { useState } from 'react';

function RegistroPacientes() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const paciente = { name, age, email };
    console.log('Paciente registrado:', paciente);
    // Añadir la API si es necesario
    setNombre('');
    setEdad('');
    setDireccion('');
  };

  return (
    <div>
      <h2>Registro de Pacientes</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegistroPacientes;

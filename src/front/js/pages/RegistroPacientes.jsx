import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext'; // Asegúrate de importar el contexto de tu store

function RegistroPacientes() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { actions, store } = useContext(Context); // Obtener acciones y store del contexto
  const navigate = useNavigate(); // Hook para la navegación programática

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions.RegistroPacientes(name, email, password); 
    // Si la acción de registro actualiza store.user o alguna otra propiedad que indique éxito,
    // redirige a la ruta deseada. Por ejemplo, a la página de inicio:
    if (store.user) {
      navigate("/logIn");
    }
  };

  return (


    <div className='container'>

      <h2>Registro de Pacientes</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div> 
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='btn btn-primary btn-lg mt-4 ms-4' type="submit">Registrar</button>  

      </form>
    </div>
  );
}

export default RegistroPacientes;

import React, { useState } from 'react';

const SingUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registered user:', form);
    // Aquí puedes agregar la lógica para enviar los datos al servidor
  };

  return (
    <div className='container'>
      <h1>Registro</h1>
      <p>Ingresa tus datos para registrarte</p>
    
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <button className='btn btn-success mt-3' type="submit">Registrar</button>
    </form>
    </div>
  );
};

export default SingUp;
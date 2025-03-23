import React, { useState } from "react";

const LoginProveedor = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/proveedores/autenticar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Autenticación fallida. Verifica tus credenciales.");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.token);
      alert("Inicio de sesión exitoso.");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión - Proveedor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={form.email}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Iniciar Sesión
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginProveedor;

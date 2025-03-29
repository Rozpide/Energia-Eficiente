import React, { useState } from "react";

const DashboardProveedor = () => {
  const [formProveedor, setFormProveedor] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  // Manejar cambios en los inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormProveedor({ ...formProveedor, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/proveedores/autenticar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formProveedor),
      });

      if (!response.ok) {
        throw new Error("Error de autenticación.");
      }

      alert("Inicio de sesión exitoso.");
    } catch (err) {
      setError("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Dashboard Proveedor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formProveedor.email}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "0.5rem", width: "300px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formProveedor.password}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "0.5rem", width: "300px" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Iniciar Sesión
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DashboardProveedor;

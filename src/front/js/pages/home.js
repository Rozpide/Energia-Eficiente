import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [proveedorId, setProveedorId] = useState(null); // ID del proveedor autenticado
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Maneja cambios en el formulario de inicio de sesión
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Maneja el envío del formulario de inicio de sesión
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
      localStorage.setItem("access_token", data.token); // Guarda el token en localStorage
      setProveedorId(data.proveedorId); // Guarda el ID del proveedor autenticado
      setIsAuthenticated(true); // Cambia el estado de autenticación
      alert("Inicio de sesión exitoso.");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  // Maneja el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Elimina el token del almacenamiento local
    setProveedorId(null); // Resetea el ID del proveedor
    setIsAuthenticated(false); // Cambia el estado de autenticación
    alert("Sesión cerrada.");
  };

  // Redirige a la página de tarifas
  const manejarVerTarifas = () => {
    if (proveedorId) {
      navigate(`/tarifas/${proveedorId}`); // Redirige a la página de tarifas
    } else {
      alert("El ID del proveedor no está disponible o es inválido.");
    }
  };
  
  

  return (
    <div className="text-center mt-5">
      <h1>Bienvenido a la Plataforma</h1>
      {!isAuthenticated ? (
        <>
          {/* Formulario de inicio de sesión */}
          <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <h3>Iniciar Sesión - Proveedor</h3>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                marginRight: "10px",
                padding: "0.5rem",
                width: "300px",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                marginRight: "10px",
                padding: "0.5rem",
                width: "300px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007BFF",
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
        </>
      ) : (
        <>
          <h3>Bienvenido, proveedor</h3>
          <button
            onClick={() => manejarVerTarifas(proveedorId)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "aquamarine",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Ver Tarifas
          </button>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              padding: "0.5rem 1rem",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cerrar Sesión
          </button>
        </>
      )}
    </div>
  );
};


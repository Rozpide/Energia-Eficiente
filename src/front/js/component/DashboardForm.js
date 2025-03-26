import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardForm = () => {
  const [proveedorId, setProveedorId] = useState(""); // Estado para guardar el ID del proveedor
  const navigate = useNavigate(); // Hook para redirigir

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
      setProveedorId(data.proveedorId); // Guarda el ID del proveedor en el estado
      setIsAuthenticated(true); // Cambia el estado de autenticación
      alert("Inicio de sesión exitoso.");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };
  

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Acceder al Dashboard del Proveedor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Introduce el ID del proveedor"
          value={proveedorId}
          onChange={(e) => setProveedorId(e.target.value)} // Actualiza el estado con el ID ingresado
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
          Acceder
        </button>
      </form>
    </div>
  );
};

export default DashboardForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardForm = () => {
  const [proveedorId, setProveedorId] = useState(""); // Estado para guardar el ID del proveedor
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = (event) => {
    event.preventDefault();
    if (proveedorId) {
      navigate(`/dashboard/${proveedorId}`); // Redirige al Dashboard del proveedor con el ID
    } else {
      alert("Por favor, introduce un ID de proveedor válido.");
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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoginProveedor from "./LoginProveedor";

const ProveedorDashboard = () => {
  const { proveedorId } = useParams(); // Obtén el ID del proveedor desde la URL
  const [tarifas, setTarifas] = useState([]);
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false); // Controla el modal

  const cargarTarifas = async () => {
    const token = localStorage.getItem("access_token"); // Obtén el token
    if (!token) {
      setShowLoginModal(true); // Muestra el modal si no hay token
      return;
    }

    try {
      const response = await fetch(
        `https://zany-meme-9gw96rvgp45cr6w-3001.app.github.dev/api/proveedores/${proveedorId}/tarifas`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar las tarifas del proveedor.");
      }

      const data = await response.json();
      setTarifas(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las tarifas.");
    }
  };

  useEffect(() => {
    cargarTarifas();
  }, [proveedorId]);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    cargarTarifas(); // Carga las tarifas después del inicio de sesión
  };

  const añadirTarifa = () => {
    alert("Función para añadir tarifas.");
  };

  const borrarTarifa = (id) => {
    alert(`Función para borrar tarifa con ID: ${id}`);
  };

  const modificarTarifa = (id) => {
    alert(`Función para modificar tarifa con ID: ${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Dashboard del Proveedor {proveedorId}
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={añadirTarifa}
        style={{
          marginBottom: "10px",
          padding: "0.5rem 1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Añadir Tarifa
      </button>
      {tarifas.length > 0 ? (
        tarifas.map((tarifa) => (
          <div
            key={tarifa.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            <p>
              <strong>{tarifa.nombre_tarifa}</strong>: ${tarifa.precio_kw_hora} por kWh
            </p>
            <p>Región: {tarifa.region}</p>
            <p>Impacto Carbón: {tarifa.carbon_impact_kgCO} kgCO</p>
            <button
              onClick={() => modificarTarifa(tarifa.id)}
              style={{
                marginRight: "10px",
                padding: "0.5rem 1rem",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Modificar
            </button>
            <button
              onClick={() => borrarTarifa(tarifa.id)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Borrar
            </button>
          </div>
        ))
      ) : (
        <p>No hay tarifas disponibles para este proveedor.</p>
      )}

      {showLoginModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <LoginProveedor onSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProveedorDashboard;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProveedorDashboard = () => {
  const { proveedorId } = useParams(); // Obtén el ID del proveedor de la URL
  const [tarifas, setTarifas] = useState([]);
  const [error, setError] = useState(null);

  const cargarTarifas = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/proveedores/${proveedorId}/tarifas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error al cargar tarifas: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setTarifas(data);
    } catch (err) {
      console.error("Error al cargar tarifas:", err);
      setError("No se pudieron cargar las tarifas.");
    }
  };

  useEffect(() => {
    cargarTarifas();
  }, [proveedorId]);

  return (
    <div>
      <h2>Dashboard del Proveedor</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {tarifas.length === 0 && !error ? (
        <p>No hay tarifas disponibles para este proveedor.</p>
      ) : (
        tarifas.map((tarifa) => (
          <div
            key={tarifa.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              marginBottom: "1rem",
            }}
          >
            <p>
              <strong>{tarifa.nombre_tarifa}</strong>: ${tarifa.precio_kw_hora} por kWh
            </p>
            <p>Región: {tarifa.region}</p>
            <p>Impacto Carbón: {tarifa.carbon_impact_kgCO} kgCO</p>
            <p>Rango Horario: {tarifa.rango_horario_bajo}</p>
            <p>Fecha y Hora Registrada: {new Date(tarifa.registro_hora_fecha_tarifa).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProveedorDashboard;

import React, { useState, useEffect } from "react";

const TarifaPublica = () => {
  const [tarifas, setTarifas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarTarifas = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/tarifas`);
        if (!response.ok) {
          throw new Error("No se pudieron cargar las tarifas públicas.");
        }
        const data = await response.json();
        setTarifas(data);
      } catch (err) {
        console.error("Error al cargar tarifas públicas:", err);
        setError("Hubo un error al cargar las tarifas.");
      }
    };
    cargarTarifas();
  }, []);

  return (
    <div>
      <h2>Tarifas Públicas</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : tarifas.length === 0 ? (
        <p>No hay tarifas disponibles.</p>
      ) : (
        tarifas.map((tarifa) => (
          <div key={tarifa.id} style={{ border: "1px solid #ddd", marginBottom: "1rem", padding: "1rem" }}>
            <p><strong>{tarifa.nombre_tarifa}</strong> - {tarifa.precio_kw_hora} €/kWh</p>
            <p>Impacto Carbón: {tarifa.carbon_impact_kgCO} kgCO</p>
            <p>Región: {tarifa.region}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TarifaPublica;

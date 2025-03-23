import React, { useState, useEffect } from "react";

const ProveedorDashboard = () => {
  const [tarifas, setTarifas] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    nombre_tarifa: "",
    precio_kw_hora: "",
    region: "",
    carbon_impact_kgCO: "",
    rango_horario_bajo: "",
    registro_hora_fecha_tarifa: "",
  });

  const cargarTarifas = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/proveedores/<int:proveedor_id>/tarifas`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setTarifas(data);
    } catch (err) {
      console.error("Error al cargar tarifas:", err);
      setError("No se pudieron cargar tus tarifas.");
    }
  };

  useEffect(() => {
    cargarTarifas();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const añadirTarifa = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tarifas`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Error al crear la tarifa.");
      }

      const nuevaTarifa = await response.json();
      setTarifas([...tarifas, nuevaTarifa]); // Añadir la nueva tarifa a la lista
      setForm({
        nombre_tarifa: "",
        precio_kw_hora: "",
        region: "",
        carbon_impact_kgCO: "",
        rango_horario_bajo: "",
        registro_hora_fecha_tarifa: "",
      }); // Limpiar el formulario
    } catch (err) {
      console.error("Error al crear tarifa:", err);
      alert("Hubo un error al crear la tarifa.");
    }
  };

  const eliminarTarifa = async (id) => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tarifas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la tarifa.");
      }

      cargarTarifas(); // Recargar las tarifas después de eliminar
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar la tarifa. Intenta nuevamente.");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Mis Tarifas</h2>
      {tarifas.length === 0 ? (
        <p>No tienes tarifas registradas.</p>
      ) : (
        <div>
          {tarifas.map((tarifa) => (
            <div
              key={tarifa.id}
              style={{
                marginBottom: "1rem",
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "5px",
              }}
            >
              <p>
                <strong>{tarifa.nombre_tarifa}</strong>: ${tarifa.precio_kw_hora} por kWh
              </p>
              <p>Región: {tarifa.region}</p>
              <p>Impacto Carbón: {tarifa.carbon_impact_kgCO} kgCO</p>
              <p>Rango Horario: {tarifa.rango_horario_bajo}</p>
              <button
                onClick={() => eliminarTarifa(tarifa.id)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "0.5rem",
                  border: "none",
                  borderRadius: "5px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      <h2>Añadir Nueva Tarifa</h2>
      <form onSubmit={añadirTarifa}>
        <input
          type="text"
          name="nombre_tarifa"
          placeholder="Nombre de la Tarifa"
          value={form.nombre_tarifa}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio_kw_hora"
          placeholder="Precio por kWh"
          value={form.precio_kw_hora}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="region"
          placeholder="Región"
          value={form.region}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="carbon_impact_kgCO"
          placeholder="Impacto Carbón (kgCO)"
          value={form.carbon_impact_kgCO}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rango_horario_bajo"
          placeholder="Rango Horario"
          value={form.rango_horario_bajo}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="registro_hora_fecha_tarifa"
          placeholder="Fecha y Hora"
          value={form.registro_hora_fecha_tarifa}
          onChange={handleChange}
          required
        />
        <button type="submit">Añadir Tarifa</button>
      </form>
    </div>
  );
};

export default ProveedorDashboard;

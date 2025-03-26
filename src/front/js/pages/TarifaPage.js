import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TarifaPage = () => {
  const { proveedorId } = useParams(); // Obtén el ID del proveedor desde la URL
  const [tarifas, setTarifas] = useState([]); // Estado para las tarifas
  const [error, setError] = useState(""); // Estado para manejar errores
  const [form, setForm] = useState({
    id: null,
    nombre_tarifa: "",
    precio_kw_hora: "",
    region: "",
    carbon_impact_kgCO: "",
    rango_horario_bajo: "",
    registro_hora_fecha_tarifa: "",
  }); // Estado para el formulario (añadir/editar tarifas)
  const [isEditing, setIsEditing] = useState(false); // Estado para mostrar/ocultar el formulario de edición

  // Función para cargar las tarifas
  const cargarTarifas = async () => {
    try {
      const response = await fetch(
        `https://zany-meme-9gw96rvgp45cr6w-3001.app.github.dev/api/proveedores/${proveedorId}/tarifas`
      );

      if (!response.ok) {
        throw new Error("Error al cargar las tarifas del proveedor.");
      }

      const data = await response.json();
      setTarifas(data); // Guarda las tarifas en el estado
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las tarifas.");
    }
  };

  useEffect(() => {
    cargarTarifas();
  }, [proveedorId]);

  // Manejar cambios en el formulario (añadir/editar)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Función para añadir una nueva tarifa
  const handleAddTarifa = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Obtener el token JWT

      const response = await fetch(
        `https://zany-meme-9gw96rvgp45cr6w-3001.app.github.dev/api/tarifas`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form, proveedor_id_fk: proveedorId }), // Datos de la nueva tarifa
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear tarifa.");
      }

      const nuevaTarifa = await response.json();
      setTarifas([...tarifas, nuevaTarifa]); // Añade la nueva tarifa al estado
      setForm({
        id: null,
        nombre_tarifa: "",
        precio_kw_hora: "",
        region: "",
        carbon_impact_kgCO: "",
        rango_horario_bajo: "",
        registro_hora_fecha_tarifa: "",
      }); // Limpia el formulario
      alert("Tarifa añadida correctamente.");
    } catch (err) {
      console.error("Error al añadir tarifa:", err);
      alert("No se pudo crear la tarifa. Intenta nuevamente.");
    }
  };

  // Función para abrir el formulario de edición con los valores actuales de una tarifa
  const handleEdit = (tarifa) => {
    setForm({ ...tarifa }); // Cargar datos de la tarifa seleccionada en el formulario
    setIsEditing(true); // Mostrar el formulario de edición
  };

  // Función para actualizar una tarifa
  const handleUpdateTarifa = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://zany-meme-9gw96rvgp45cr6w-3001.app.github.dev/api/tarifas/${form.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form), // Enviar los datos de la tarifa actualizada
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar tarifa.");
      }

      const tarifaActualizada = await response.json();
      setTarifas(
        tarifas.map((tarifa) => (tarifa.id === tarifaActualizada.id ? tarifaActualizada : tarifa))
      ); // Actualizar la lista de tarifas
      setIsEditing(false); // Ocultar el formulario de edición
      alert("Tarifa actualizada correctamente.");
    } catch (err) {
      console.error("Error al actualizar tarifa:", err);
      alert("No se pudo actualizar la tarifa. Intenta nuevamente.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Tarifas del Proveedor {proveedorId}
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Formulario para añadir una nueva tarifa */}
      {!isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTarifa();
          }}
          style={{
            marginBottom: "20px",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>Añadir Nueva Tarifa</h3>
          <input
            type="text"
            name="nombre_tarifa"
            placeholder="Nombre de la Tarifa"
            value={form.nombre_tarifa}
            onChange={handleChange}
            required
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
          />
          <input
            type="number"
            name="precio_kw_hora"
            placeholder="Precio por kWh"
            value={form.precio_kw_hora}
            onChange={handleChange}
            required
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
          />
          <input
            type="text"
            name="region"
            placeholder="Región"
            value={form.region}
            onChange={handleChange}
            required
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
          />
          <input
            type="number"
            name="carbon_impact_kgCO"
            placeholder="Impacto de Carbono (kgCO)"
            value={form.carbon_impact_kgCO}
            onChange={handleChange}
            required
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
          />
          <input
            type="text"
            name="rango_horario_bajo"
            placeholder="Rango Horario (opcional)"
            value={form.rango_horario_bajo}
            onChange={handleChange}
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
          />
          <input
            type="datetime-local"
            name="registro_hora_fecha_tarifa"
            placeholder="Fecha y hora de registro"
            value={form.registro_hora_fecha_tarifa}
            onChange={handleChange}
            required
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
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
            Añadir Tarifa
          </button>
        </form>
      )}

      {/* Lista de tarifas */}
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
              <strong>{tarifa.nombre_tarifa}</strong>: ${tarifa.precio_kw_hora}{" "}
              por kWh
            </p>
            <p>Región: {tarifa.region}</p>
            <p>Impacto Carbón: {tarifa.carbon_impact_kgCO} kgCO</p>
            <button
              onClick={() => handleEdit(tarifa)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Editar
            </button>
          </div>
        ))
      ) : (
        <p>No hay tarifas disponibles para este proveedor.</p>
      )}

            {/* Formulario de edición */}
            {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateTarifa();
          }}
          style={{
            marginTop: "20px",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>Editar Tarifa</h3>
          <input
            type="text"
            name="nombre_tarifa"
            placeholder="Nombre de la Tarifa"
            value={form.nombre_tarifa}
            onChange={handleChange}
            required
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
          />
          <input
            type="number"
            name="precio_kw_hora"
            placeholder="Precio por kWh"
            value={form.precio_kw_hora}
            onChange={handleChange}
            required
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
          />
          <input
            type="text"
            name="region"
            placeholder="Región"
            value={form.region}
            onChange={handleChange}
            required
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
          />
          <input
            type="number"
            name="carbon_impact_kgCO"
            placeholder="Impacto de Carbono (kgCO)"
            value={form.carbon_impact_kgCO}
            onChange={handleChange}
            required
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
          />
          <input
            type="text"
            name="rango_horario_bajo"
            placeholder="Rango Horario (opcional)"
            value={form.rango_horario_bajo}
            onChange={handleChange}
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
          />
          <input
            type="datetime-local"
            name="registro_hora_fecha_tarifa"
            placeholder="Fecha y hora de registro"
            value={form.registro_hora_fecha_tarifa}
            onChange={handleChange}
            required
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
            }}
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
            Guardar Cambios
          </button>
          <button
            onClick={() => setIsEditing(false)} // Cerrar formulario de edición
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default TarifaPage;



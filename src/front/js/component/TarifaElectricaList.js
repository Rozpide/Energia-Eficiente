/*

import React, { useState, useEffect } from "react";

const TarifaElectricaList = ({ proveedorId, filterFunction }) => {
  const [tarifas, setTarifas] = useState([]); // Estado para tarifas obtenidas
  const [error, setError] = useState(""); // Estado para manejar errores
  const [form, setForm] = useState({
    nombre_tarifa: "",
    precio_kw_hora: "",
    region: "",
    carbon_impact_kgCO: "",
    rango_horario_bajo: "",
  }); // Estado para los datos del formulario

  // Función para cargar las tarifas del proveedor
  const cargarTarifas = () => {
    fetch(`${process.env.BACKEND_URL}/api/proveedores/${proveedorId}/tarifas`)
      .then((response) => {
        if (!response.ok) {
          console.log("Respueta:", response.text());
          throw new Error(`Error al cargar tarifas: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const tarifasFiltradas = filterFunction ? filterFunction(data) : data; // Aplicar filtro si existe
        setTarifas(tarifasFiltradas); // Guardar tarifas (filtradas o completas)
      })
      .catch((error) => {
        console.error("Error al cargar tarifas:", error);
        setError("No se pudieron cargar las tarifas. Intenta nuevamente.");
      });
  };

  // Llama a cargarTarifas al montar el componente o cuando proveedorId cambia
  useEffect(() => {
    if (proveedorId) {
      cargarTarifas();
    }
  }, [proveedorId]);

  // Función para añadir una nueva tarifa
  const handleAddTarifa = () => {
    const token = localStorage.getItem("access_token"); // Obtener el token del localStorage

    fetch(`${process.env.BACKEND_URL}/api/tarifas`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Token para autenticación
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, proveedor_id_fk: proveedorId }), // Datos de la nueva tarifa
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear tarifa.");
        }
        return response.json();
      })
      .then((nuevaTarifa) => {
        alert("Tarifa añadida correctamente.");
        setTarifas([...tarifas, nuevaTarifa]); // Actualizar la lista de tarifas
        setForm({
          nombre_tarifa: "",
          precio_kw_hora: "",
          region: "",
          carbon_impact_kgCO: "",
          rango_horario_bajo: "",
        }); // Limpiar el formulario
      })
      .catch((error) => {
        console.error("Error al añadir tarifa:", error);
        alert("No se pudo crear la tarifa. Intenta nuevamente.");
      });
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log("Estado del formulario actualizado:", { ...form, [name]: value });
  };

  return (
    <div>
      <h2>Lista de Tarifas Eléctricas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} 

      
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
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
          style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
        />
        <input
          type="number"
          name="precio_kw_hora"
          placeholder="Precio por kWh"
          value={form.precio_kw_hora}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
        />
        <input
          type="text"
          name="region"
          placeholder="Región"
          value={form.region}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
        />
        <input
          type="number"
          name="carbon_impact_kgCO"
          placeholder="Impacto de Carbono (kgCO)"
          value={form.carbon_impact_kgCO}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
        />
        <input
          type="text"
          name="rango_horario_bajo"
          placeholder="Rango Horario (opcional)"
          value={form.rango_horario_bajo}
          onChange={handleChange}
          style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
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
          Añadir UUNNAATarifa
        </button>
      </form>

      
      {tarifas.length > 0 ? (
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
            <p>Fecha Registrada: {new Date(tarifa.registro_hora_fecha_tarifa).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No hay tarifas disponibles para este proveedor.</p>
      )}
    </div>
  );
};

export default TarifaElectricaList;

*/
import React, { useState, useEffect } from "react";

const TarifaElectricaList = ({ proveedorId, filterFunction }) => {
  const [tarifas, setTarifas] = useState([]); // Estado para tarifas obtenidas
  const [error, setError] = useState(""); // Estado para manejar errores
  const [form, setForm] = useState({
    nombre_tarifa: "",
    precio_kw_hora: "",
    region: "",
    carbon_impact_kgCO: "",
    rango_horario_bajo: "",
    zonas_geograficas: [], // Lista de polígonos dibujados en el mapa
  }); // Estado para los datos del formulario
  const [map, setMap] = useState(null); // Referencia al mapa
  const [drawingManager, setDrawingManager] = useState(null); // Referencia al Drawing Manager

  // Función para cargar las tarifas del proveedor
  const cargarTarifas = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/proveedores/${proveedorId}/tarifas`);
      if (!response.ok) {
        throw new Error(`Error al cargar tarifas: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const tarifasFiltradas = filterFunction ? filterFunction(data) : data; // Aplicar filtro si existe
      setTarifas(tarifasFiltradas); // Guardar tarifas (filtradas o completas)
    } catch (error) {
      console.error("Error al cargar tarifas:", error);
      setError("No se pudieron cargar las tarifas. Intenta nuevamente.");
    }
  };

  // Inicializa el mapa y el Drawing Manager
  useEffect(() => {
    const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.416775, lng: -3.703790 }, // Coordenadas iniciales (Madrid, España)
      zoom: 6,
    });
    setMap(mapInstance);

    const drawingManagerInstance = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: {
        fillColor: "#FF0000",
        fillOpacity: 0.4,
        strokeWeight: 2,
        clickable: true,
        editable: true,
        zIndex: 1,
      },
    });

    drawingManagerInstance.setMap(mapInstance);
    setDrawingManager(drawingManagerInstance);

    // Evento para manejar el dibujo de polígonos
    window.google.maps.event.addListener(drawingManagerInstance, "overlaycomplete", (event) => {
      if (event.type === window.google.maps.drawing.OverlayType.POLYGON) {
        const path = event.overlay.getPath();
        const coordinates = path.getArray().map((latLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));
        setForm((prevForm) => ({
          ...prevForm,
          zonas_geograficas: [...prevForm.zonas_geograficas, coordinates],
        }));
        alert("Zona geográfica añadida correctamente.");
      }
    });
  }, []);

  // Función para añadir una nueva tarifa
  const handleAddTarifa = () => {
    const token = localStorage.getItem("access_token"); // Obtener el token del localStorage

    fetch(`${process.env.BACKEND_URL}/api/tarifas`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Token para autenticación
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, proveedor_id_fk: proveedorId }), // Datos de la nueva tarifa
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear tarifa.");
        }
        return response.json();
      })
      .then((nuevaTarifa) => {
        alert("Tarifa añadida correctamente.");
        setTarifas([...tarifas, nuevaTarifa]); // Actualizar la lista de tarifas
        setForm({
          nombre_tarifa: "",
          precio_kw_hora: "",
          region: "",
          carbon_impact_kgCO: "",
          rango_horario_bajo: "",
          zonas_geograficas: [],
        }); // Limpiar el formulario
      })
      .catch((error) => {
        console.error("Error al añadir tarifa:", error);
        alert("No se pudo crear la tarifa. Intenta nuevamente.");
      });
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <h2>Lista de TarifaAAAAAAAAs Eléctricas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar error si ocurre */}

      {/* Formulario para añadir una nueva tarifa */}
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
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
          style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
        />
        <input
          type="number"
          name="precio_kw_hora"
          placeholder="Precio por kWh"
          value={form.precio_kw_hora}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
        />
        <input
          type="text"
          name="region"
          placeholder="Región"
          value={form.region}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
        />
        <input
          type="number"
          name="carbon_impact_kgCO"
          placeholder="Impacto de Carbono (kgCO)"
          value={form.carbon_impact_kgCO}
          onChange={handleChange}
          required
          style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
        />
        <input
          type="text"
          name="rango_horario_bajo"
          placeholder="Rango Horario (opcional)"
          value={form.rango_horario_bajo}
          onChange={handleChange}
          style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
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
        <div id="map" style={{ width: "100%", height: "500px", marginTop: "20px" }}></div>
        <p style={{ marginTop: "10px" }}>
          Usa el lápiz en el mapa para delinear las zonas geográficas de servicio.
        </p>
      </form>

      {/* Renderizar tarifas si están disponibles */}
      {tarifas.length > 0 ? (
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
            <p>Fecha Registrada: {new Date(tarifa.registro_hora_fecha_tarifa).toLocaleString()}</p>
            <p>Zonas Geográficas Asociadas: {tarifa.zonas_geograficas?.length || 0} zonas definidas</p>
          </div>
        ))
      ) : (
        <p>No hay tarifas disponibles para este proveedor.</p>
      )}
    </div>
  );
}
export default TarifaElectricaList;
// TarifaElectricaList.js
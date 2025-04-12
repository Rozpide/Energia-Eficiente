import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MusicPlayer from "../component/MusicPlayer";

const TarifaPage = () => {
  const { proveedorId } = useParams(); // ID del proveedor desde la URL
  const { nombre_proveedor } = useParams(); // ID del proveedor desde la URL
  const [tarifas, setTarifas] = useState([]); // Estado para tarifas
  const [mapMarkers, setMapMarkers] = useState([]); // Estado para manejar marcadores en el mapa
  const [error, setError] = useState(""); // Manejo de errores
  const [form, setForm] = useState({
    id: null,
    nombre_tarifa: "",
    precio_kw_hora: "",
    region: "",
    carbon_impact_kgCO: "",
    rango_horario_bajo: "",
    registro_hora_fecha_tarifa: "",
    zonas_geograficas: [], // Lista de marcadores
  });
  const [map, setMap] = useState(null); // Referencia al mapa
  const [isEditing, setIsEditing] = useState(false); // Estado para edición

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById("googleMaps");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCLXcGgycpOj9hAkolG71_60wbqFwy1c8Q&libraries=marker&v=weekly`;
        script.id = "googleMaps";
        script.async = true;
        script.defer = true; // Mejora del rendimiento
        document.body.appendChild(script);
        script.onload = () => initMap();
      } else {
        initMap();
      }
    };

    const initMap = async () => {
      if (window.google && window.google.maps) {
        const mapDiv = document.getElementById("map");
        if (!mapDiv) {
          console.error("El contenedor del mapa (#map) no está disponible.");
          return;
        }

        const mapInstance = new window.google.maps.Map(mapDiv, {
          center: { lat: 40.416775, lng: -3.70379 }, // Madrid, España
          zoom: 6,
        });
        setMap(mapInstance);

        const bounds = new window.google.maps.LatLngBounds();

        try {
          const response = await fetch(
            `https://zany-meme-9gw96rvgp45cr6w-3001.app.github.dev/api/proveedores/${proveedorId}/tarifas`
          );
          if (!response.ok) throw new Error("Error al cargar las tarifas.");
          const data = await response.json();
          setTarifas(data);

          const allMarkers = data.map((tarifa) => {
            const coordenadas =
              tarifa.latitude !== null && tarifa.longitude !== null
                ? { lat: tarifa.latitude, lng: tarifa.longitude }
                : JSON.parse(tarifa.zonas_geograficas || "[]")[0] || null;

            if (coordenadas) {
              const marker = new window.google.maps.Marker({
                position: coordenadas,
                map: mapInstance,
                title: tarifa.nombre_tarifa || "Tarifa sin nombre",
              });

              bounds.extend(coordenadas);

              const infoWindow = new window.google.maps.InfoWindow({
                content: `<div><h3>${
                  tarifa.nombre_tarifa || "Tarifa sin nombre"
                }</h3>
                          <p>Región: ${tarifa.region || "No especificada"}</p>
                          <p>Precio: $${
                            tarifa.precio_kw_hora || "N/A"
                          }</p></div>`,
              });

              marker.addListener("click", () => {
                infoWindow.open(mapInstance, marker);
              });

              return marker;
            }
            return null;
          });

          mapInstance.fitBounds(bounds);
          setMapMarkers(allMarkers.filter((marker) => marker !== null)); // Filtrar marcadores nulos

          // *** Habilitar evento de clic en el mapa ***
          mapInstance.addListener("click", (event) => {
            const newMarker = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            };
            setForm((prevForm) => ({
              ...prevForm,
              zonas_geograficas: [...prevForm.zonas_geograficas, newMarker], // Actualizar zonas_geograficas
            }));
            const marker = new window.google.maps.Marker({
              position: newMarker,
              map: mapInstance,
            });
            setMapMarkers((prevMarkers) => [...prevMarkers, marker]); // Actualizar marcadores
          });
        } catch (error) {
          console.error("Error al cargar tarifas:", error.message);
          setError("No se pudieron cargar las tarifas del proveedor.");
        }
      } else {
        console.error(
          "Google Maps no está disponible. Verifica la carga del script."
        );
      }
    };

    loadGoogleMapsScript();
  }, [proveedorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddTarifa = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://zany-meme-9gw96rvgp45cr6w-3001.app.github.dev/api/tarifas`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            proveedor_id_fk: proveedorId,
            zonas_geograficas: JSON.stringify(form.zonas_geograficas),
          }),
        }
      );

      if (!response.ok) throw new Error("Error al añadir la tarifa.");
      alert("Tarifa añadida correctamente.");
      const responseTarifas = await fetch(
        `https://zany-meme-9gw96rvgp45cr6w-3001.app.github.dev/api/proveedores/${proveedorId}/tarifas`
      );
      const updatedTarifas = await responseTarifas.json();
      setTarifas(updatedTarifas);
      setForm({
        id: null,
        nombre_tarifa: "",
        precio_kw_hora: "",
        region: "",
        carbon_impact_kgCO: "",
        rango_horario_bajo: "",
        registro_hora_fecha_tarifa: "",
        zonas_geograficas: [],
      });
    } catch (err) {
      console.error("Error al añadir tarifa:", err);
      alert("No se pudo crear la tarifa. Intenta nuevamente.");
    }
  };

  const handleEdit = (tarifa) => {
    setForm({
      ...tarifa,
      zonas_geograficas: JSON.parse(tarifa.zonas_geograficas),
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta tarifa?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://zany-meme-9gw96rvgp45cr6w-3001.app.github.dev/api/tarifas/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar tarifa.");
      alert("Tarifa eliminada correctamente.");
      setTarifas(tarifas.filter((tarifa) => tarifa.id !== id));
    } catch (err) {
      console.error("Error al eliminar tarifa:", err);
      alert("No se pudo eliminar la tarifa. Intenta nuevamente.");
    }
  };

  const handleUpdateTarifa = async () => {
    try {
      console.log(
        "Datos enviados a la AAAPIIII para actualizar la tarifa:",
        form
      );
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `https://zany-meme-9gw96rvgp45cr6w-3001.app.github.dev/api/tarifas/${form.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar tarifa.");
      const tarifaActualizada = await response.json();
      setTarifas(
        tarifas.map((tarifa) =>
          tarifa.id === tarifaActualizada.id ? tarifaActualizada : tarifa
        )
      );
      setIsEditing(false);
      alert("Tarifa actualizada correctamente.");
      initMap(); // Recargar el mapa para mostrar los cambios
    } catch (err) {
      console.error("Error al actualizar tarifa:", err);
      alert("No se pudo actualizar la tarifa.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isEditing && (
        <>
          <MusicPlayer/>
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
            <h3> Nueva Tarifa</h3>
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
            <div
              id="map"
              style={{ width: "100%", height: "400px", marginTop: "20px" }}
            ></div>
            <p style={{ marginTop: "10px" }}>
              Haz clic en el mapa para añadir marcadores que definan la zona de
              servicio.
            </p>
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
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Tarifas del Proveedor</h3>
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
                <strong>{tarifa.nombre_tarifa}</strong>: $
                {tarifa.precio_kw_hora} por kWh
              </p>
              <p>Región: {tarifa.region}</p>
              <p>Impacto de Carbono: {tarifa.carbon_impact_kgCO} kgCO</p>
              <p>Rango Horario: {tarifa.rango_horario_bajo || "N/A"}</p>
              <p>Zonas Geográficas: {tarifa.zonas_geograficas}</p>
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
              <button
                onClick={() => handleDelete(tarifa.id)}
                style={{
                  marginLeft: "10px",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No hay tarifas disponibles para este proveedor.</p>
        )}
      </div>

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

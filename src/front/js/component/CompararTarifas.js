import React, { useEffect, useState } from "react";

const CompararTarifas = () => {
  const [tarifas, setTarifas] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    region: "",
    rango_horario: "",
    max_carbon_impact: "",
  });
  const [resultados, setResultados] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Cargar todas las tarifas desde el backend
  const cargarTarifas = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/tarifas`);
      if (!response.ok) {
        throw new Error("Error al cargar las tarifas.");
      }
      const data = await response.json();
      setTarifas(data);
    } catch (err) {
      setError("No se pudieron cargar las tarifas. Inténtalo más tarde.");
      console.error(err);
    }
  };

  useEffect(() => {
    cargarTarifas();
  }, []);

  // Cargar el script de Google Maps y inicializar el mapa
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById("googleMaps");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCLXcGgycpOj9hAkolG71_60wbqFwy1c8Q`; // Reemplaza TU_CLAVE_API
        script.id = "googleMaps";
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => initMap();
      } else {
        initMap();
      }
    };

    const initMap = () => {
      if (window.google && window.google.maps && !map) {
        const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: 40.416775, lng: -3.70379 }, // Madrid, España
          zoom: 6,
        });
        setMap(mapInstance);

        const initialMarkers = tarifas.map((tarifa) => {
          if (tarifa.latitude && tarifa.longitude) {
            const marker = new window.google.maps.Marker({
              position: { lat: tarifa.latitude, lng: tarifa.longitude },
              map: mapInstance,
              title: tarifa.nombre_tarifa,
            });

            const infoWindow = new window.google.maps.InfoWindow({
              content: `<div><h3>${tarifa.nombre_tarifa}</h3><p>Región: ${tarifa.region}</p><p>Precio: $${tarifa.precio_kw_hora}</p></div>`,
            });

            marker.addListener("click", () => {
              infoWindow.open(mapInstance, marker);
            });

            return marker;
          }
          return null;
        });

        setMarkers(initialMarkers);
      }
    };

    loadGoogleMapsScript();
  }, [tarifas]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Filtrar y calcular las tarifas
  const calcularMejoresTarifas = () => {
    if (!form.region || !form.rango_horario || !form.max_carbon_impact) {
      alert("Por favor, completa todas las preguntas antes de continuar.");
      return;
    }

    const evaluarPrioridades = (tarifa) => {
      let coincidencias = 0;
      if (tarifa.region?.toLowerCase() === form.region.toLowerCase()) coincidencias++;
      if (
        tarifa.rango_horario_bajo &&
        tarifa.rango_horario_bajo.includes(form.rango_horario)
      )
        coincidencias++;
      if (tarifa.carbon_impact_kgCO <= parseFloat(form.max_carbon_impact)) coincidencias++;
      return coincidencias;
    };

    const tarifasConPrioridades = tarifas.map((tarifa) => ({
      ...tarifa,
      coincidencias: evaluarPrioridades(tarifa),
    }));

    let tarifasFiltradas = tarifasConPrioridades.filter(
      (tarifa) => tarifa.coincidencias === 3
    );

    if (tarifasFiltradas.length === 0) {
      tarifasFiltradas = tarifasConPrioridades.filter(
        (tarifa) => tarifa.coincidencias === 2
      );
    }

    if (tarifasFiltradas.length === 0) {
      tarifasFiltradas = tarifasConPrioridades.filter(
        (tarifa) => tarifa.coincidencias === 1
      );
    }

    const mejoresTarifas = tarifasFiltradas
      .sort((a, b) => a.precio_kw_hora - b.precio_kw_hora)
      .slice(0, 3);

    setResultados(mejoresTarifas);

    // Actualizar marcadores en el mapa
    if (map) {
      markers.forEach((marker) => marker.setMap(null));
      const filteredMarkers = mejoresTarifas.map((tarifa) => {
        if (tarifa.latitude && tarifa.longitude) {
          const marker = new window.google.maps.Marker({
            position: { lat: tarifa.latitude, lng: tarifa.longitude },
            map: map,
            title: tarifa.nombre_tarifa,
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div><h3>${tarifa.nombre_tarifa}</h3><p>Región: ${tarifa.region}</p><p>Precio: $${tarifa.precio_kw_hora}</p></div>`,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });

          return marker;
        }
        return null;
      });

      setMarkers(filteredMarkers);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Comparar Tarifas</h1>

      <form style={{ marginBottom: "20px" }}>
        <h3>Responde las siguientes preguntas:</h3>
        <label>
          Región preferida:
          <input
            type="text"
            name="region"
            placeholder="Ejemplo: Asturias"
            value={form.region}
            onChange={handleChange}
            required
            style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
          />
        </label>
        <label>
          Rango horario de consumo:
          <input
            type="text"
            name="rango_horario"
            placeholder="Ejemplo: 23:00 - 05:00"
            value={form.rango_horario}
            onChange={handleChange}
            required
            style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
          />
        </label>
        <label>
          Impacto ambiental máximo (kgCO):
          <input
            type="number"
            name="max_carbon_impact"
            placeholder="Ejemplo: 0.5"
            value={form.max_carbon_impact}
            onChange={handleChange}
            required
            style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
          />
        </label>
        <button
          type="button"
          onClick={calcularMejoresTarifas}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Buscar Mejores Tarifas
        </button>
      </form>

      {resultados.length > 0 && (
        <div>
          <h3>Las tarifas más adecuadas para ti:</h3>
          {resultados.map((tarifa) => (
            <div
              key={tarifa.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <p>
                <strong>{tarifa.nombre_tarifa}                </strong>: ${tarifa.precio_kw_hora} por kWh
              </p>
              <p>Región: {tarifa.region}</p>
              <p>Impacto Carbono: {tarifa.carbon_impact_kgCO} kgCO</p>
              <p>Rango Horario: {tarifa.rango_horario_bajo || "No especificado"}</p>
            </div>
          ))}
        </div>
      )}

      <div id="map" style={{ width: "100%", height: "500px", marginTop: "20px" }}></div>

      {resultados.length === 0 && (
        <p style={{ marginTop: "10px", color: "#888" }}>
          No se encontraron tarifas que coincidan con tus preferencias.
        </p>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default CompararTarifas;



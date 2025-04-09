import React, { useEffect, useState } from "react";
import Papa from "papaparse"; // Importar la librería PapaParse para CSV
import Mammoth from "mammoth"; // Importar Mammoth para archivos DOCX

// Datos predeterminados
const consumoDefault = [
  { mes: 'enero', consumo_kWh: 150 },
  { mes: 'febrero', consumo_kWh: 130 },
  { mes: 'marzo', consumo_kWh: 140 },
  { mes: 'abril', consumo_kWh: 150 },
  // Puedes añadir más datos si los necesitas
];

const CompararTarifas = () => {
  const [consumoMensual, setConsumoMensual] = useState([]);

  const [tarifas, setTarifas] = useState([]); // Tarifas cargadas desde el backend
  const [error, setError] = useState(null); // Manejo de errores
  const [form, setForm] = useState({
    region: "",
    rango_horario: "",
    max_carbon_impact: "",
  });
  const [resultados, setResultados] = useState([]); // Tarifas filtradas
  const [map, setMap] = useState(null); // Referencia al mapa
  const [markers, setMarkers] = useState([]); // Lista de marcadores en el mapa
  
  // Cargar todas las tarifas desde el backend
  const cargarTarifas = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/tarifas`);
      if (!response.ok) {
        throw new Error("Error al cargar las tarifas.");
      }
      const data = await response.json();
      console.log("Datos de tarifas recibidos:", data);

      setTarifas(data);
    } catch (err) {
      setError("No se pudieron cargar las tarifas. Inténtalo más tarde.");
      console.error(err);
    }
  };

  useEffect(() => {
    cargarTarifas(); // Ejecutar la carga de tarifas al montar el componente
  }, []);

  // Inicializar el mapa y mostrar todos los marcadores
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById("googleMaps");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCLXcGgycpOj9hAkolG71_60wbqFwy1c8Q`; // Reemplaza con tu clave API
        script.id = "googleMaps";
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => initMap();
      } else {
        initMap();
      }
    };

    const initMap = () => {
      if (window.google && window.google.maps) {
        const mapInstance = new window.google.maps.Map(
          document.getElementById("map"),
          {
            center: { lat: 40.416775, lng: -3.70379 }, // Madrid, España
            zoom: 6,
          }
        );
        setMap(mapInstance);

        const bounds = new window.google.maps.LatLngBounds(); // Crear límites dinámicos

        const allMarkers = tarifas.map((tarifa) => {
          // Si no tiene latitud o longitud, usar coordenadas predeterminadas
          const latitude = tarifa.latitude ?? 40.416775;
          const longitude = tarifa.longitude ?? -3.70379;

          const marker = new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: mapInstance,
            title: tarifa.nombre_tarifa || "Tarifa sin nombre",
          });

          bounds.extend(new window.google.maps.LatLng(latitude, longitude)); // Ajustar los límites para incluir este marcador

          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div><h3>${
              tarifa.nombre_tarifa || "Tarifa sin nombre"
            }</h3>
                      <p>Región: ${tarifa.region || "No especificada"}</p>
                      <p>Precio: $${tarifa.precio_kw_hora || "N/A"}</p></div>`,
          });

          marker.addListener("click", () => {
            infoWindow.open(mapInstance, marker);
          });

          return marker;
        });

        mapInstance.fitBounds(bounds); // Ajustar el mapa para que todos los marcadores sean visibles
        setMarkers(allMarkers); // Guardar los marcadores en el estado
      } else {
        console.error(
          "Google Maps no está disponible. Verifica la carga del script."
        );
      }
    };

    loadGoogleMapsScript(); // Cargar el script de Google Maps
    // Cargar el script de Google Maps
  }, [tarifas]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const fileExtension = file.name.split(".").pop().toLowerCase();
  
    if (fileExtension === "csv") {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const consumoMensualCargado = results.data.map((row) => ({
            mes: row.mes,
            consumo_kWh: parseFloat(row.consumo_kWh),
          }));
          setConsumoMensual(consumoMensualCargado); // Actualiza el estado global
          console.log("Datos de consumo cargados:", consumoMensualCargado);
  
          const mejoresTarifas = calcularCostosPorTarifa(consumoMensualCargado, tarifas);
          setResultados(mejoresTarifas); // Actualiza los resultados para mostrarlos en la UI
        },
      });
    } else if (fileExtension === "doc" || fileExtension === "docx") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
  
        try {
          const { value: text } = await Mammoth.extractRawText({ arrayBuffer });
  
          const consumoMensualCargado = procesarTextoWord(text);
          setConsumoMensual(consumoMensualCargado); // Actualiza el estado global
          console.log("Datos procesados desde archivo Word:", consumoMensualCargado);
  
          const mejoresTarifas = calcularCostosPorTarifa(consumoMensualCargado, tarifas);
          setResultados(mejoresTarifas); // Actualiza los resultados para mostrarlos en la UI
        } catch (err) {
          console.error("Error al procesar el archivo Word:", err);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Tipo de archivo no soportado. Por favor, sube un archivo .csv o .docx.");
    }
  };
  

  const analizarConsumo = (consumoMensual) => {
    if (consumoMensual.length === 0) return;

    const consumoTotal = consumoMensual.reduce(
      (acc, mes) => acc + mes.consumo_kWh,
      0
    );
    const consumoPromedio = consumoTotal / consumoMensual.length;

    const consumoMaximo = Math.max(
      ...consumoMensual.map((mes) => mes.consumo_kWh)
    );
    const consumoMinimo = Math.min(
      ...consumoMensual.map((mes) => mes.consumo_kWh)
    );

    console.log("Análisis de consumo:");
    console.log("Promedio:", consumoPromedio);
    console.log("Máximo:", consumoMaximo);
    console.log("Mínimo:", consumoMinimo);

    // Aquí podrías guardar estos valores en el estado si son necesarios
  };

  const calcularCostosPorTarifa = (consumoMensual, tarifas) => {
    if (consumoMensual.length === 0 || tarifas.length === 0) return;

    // Calcular el consumo promedio mensual
    const consumoTotal = consumoMensual.reduce(
      (acc, mes) => acc + mes.consumo_kWh,
      0
    );
    const consumoPromedio = consumoTotal / consumoMensual.length;

    // Calcular el costo estimado por tarifa
    const costosEstimados = tarifas.map((tarifa) => {
      const costoEstimado = tarifa.precio_kw_hora * consumoPromedio; // Costo mensual estimado
      return {
        ...tarifa,
        costoEstimado,
      };
    });

    // Ordenar las tarifas según el menor costo estimado
    const tarifasOrdenadas = costosEstimados.sort(
      (a, b) => a.costoEstimado - b.costoEstimado
    );

    console.log("Costos estimados por tarifa:", tarifasOrdenadas);

    return tarifasOrdenadas.slice(0, 3); // Devuelve las 3 tarifas más económicas
  };

  const procesarTextoWord = (texto) => {
    // Dividir el texto en líneas y eliminar líneas vacías
    const lineas = texto.split("\n").filter((linea) => linea.trim() !== "");

    // Ignorar la primera línea (encabezados) y convertir el resto en objetos
    const consumoMensual = lineas.slice(1).map((linea) => {
      const [mes, consumo_kWh] = linea.split(",");
      return {
        mes: mes.trim(), // Eliminar espacios en el nombre del mes
        consumo_kWh: parseFloat(consumo_kWh), // Convertir el consumo a número
      };
    });

    console.log("Datos procesados desde texto Word:", consumoMensual);
    return consumoMensual;
  };

  // Filtrar y calcular las tarifas
  const calcularMejoresTarifas = () => {
    if (!form.region || !form.rango_horario || !form.max_carbon_impact) {
      alert("Por favor, completa todas las preguntas antes de continuar.");
      return;
    }
  
    // Usar datos predeterminados si no hay consumo cargado
    const consumoDefault = [
      { mes: 'enero', consumo_kWh: 150 },
      { mes: 'febrero', consumo_kWh: 130 },
      { mes: 'marzo', consumo_kWh: 140 },
      { mes: 'abril', consumo_kWh: 150 },
      // Puedes añadir más datos...
    ];
    const consumoParaCalculo = consumoMensual.length > 0 ? consumoMensual : consumoDefault;
  
    // Calcular el total y promedio de consumo
    const consumoTotal = consumoParaCalculo.reduce((acc, mes) => acc + mes.consumo_kWh, 0);
    const consumoPromedio = consumoTotal / consumoParaCalculo.length;
  
    const evaluarPrioridades = (tarifa) => {
      let coincidencias = 0;
      if (tarifa.region?.toLowerCase() === form.region.toLowerCase()) coincidencias++;
      if (tarifa.rango_horario_bajo?.includes(form.rango_horario)) coincidencias++;
      if (tarifa.carbon_impact_kgCO <= parseFloat(form.max_carbon_impact)) coincidencias++;
      return coincidencias;
    };
  
    // Evaluar tarifas y calcular costos estimados
    const tarifasConPrioridades = tarifas.map((tarifa) => ({
      ...tarifa,
      coincidencias: evaluarPrioridades(tarifa),
      costoEstimado: tarifa.precio_kw_hora * consumoPromedio, // Basado en consumo
    }));
  
    // Filtrar tarifas por coincidencias
    let tarifasFiltradas = tarifasConPrioridades.filter((tarifa) => tarifa.coincidencias === 3);
  
    if (tarifasFiltradas.length === 0) {
      tarifasFiltradas = tarifasConPrioridades.filter((tarifa) => tarifa.coincidencias === 2);
    }
  
    if (tarifasFiltradas.length === 0) {
      tarifasFiltradas = tarifasConPrioridades.filter((tarifa) => tarifa.coincidencias === 1);
    }
  
    // Ordenar tarifas por costo estimado y mostrar las mejores
    const mejoresTarifas = tarifasFiltradas
      .sort((a, b) => a.costoEstimado - b.costoEstimado)
      .slice(0, 3);
  
    setResultados(mejoresTarifas);
  
    // Actualizar marcadores en el mapa
    if (map) {
      markers.forEach((marker) => marker.setMap(null)); // Limpiar marcadores previos
  
      const filteredMarkers = mejoresTarifas.map((tarifa) => {
        const latitude = tarifa.latitude || 40.416775;
        const longitude = tarifa.longitude || -3.70379;
  
        const marker = new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          title: tarifa.nombre_tarifa,
        });
  
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><h3>${tarifa.nombre_tarifa}</h3>
                    <p>Región: ${tarifa.region || "No especificada"}</p>
                    <p>Precio: $${tarifa.precio_kw_hora || "N/A"}</p>
                    <p>Costo estimado: $${tarifa.costoEstimado?.toFixed(2) || "N/A"}</p></div>`,
        });
  
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
  
        return marker;
      });
  
      setMarkers(filteredMarkers);
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h1>Para Comparar Tarifas</h1>

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
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
              color: "white",
            }}
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
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
              color: "white",
            }}
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
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
              color: "red",
            }}
          />
        </label>
        <label>
          Cargar datos históricos de consumo (.csv):
          <input
            type="file"
            accept=".csv, .doc, .docx"
            onChange={handleFileUpload}
            style={{
              marginBottom: "10px",
              padding: "0.5rem",
              width: "100%",
              color: "blue",
            }}
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
                <strong>{tarifa.nombre_tarifa}</strong>: $
                {tarifa.precio_kw_hora} por kWh
              </p>
              <p>
                Costo estimado mensual:{" "}
                {tarifa.costoEstimado !== undefined
                  ? `$${tarifa.costoEstimado.toFixed(2)}`
                  : "N/A"}
              </p>
              <p>Región: {tarifa.region}</p>
              <p>
                Rango Horario: {tarifa.rango_horario_bajo || "No especificado"}
              </p>
            </div>
          ))}
        </div>
      )}

      <div
        id="map"
        style={{ width: "100%", height: "500px", marginTop: "20px" }}
      ></div>

      {resultados.length === 0 && (
        <p style={{ marginTop: "10px", color: "#888" }}>
          No se encontraron tarifas que coincidan con tus preferencias.
        </p>
      )}

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </div>
  );
};

export default CompararTarifas;

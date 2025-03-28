import React, { useEffect, useState } from "react";

const CompararTarifas = () => {
  const [tarifas, setTarifas] = useState([]); // Tarifas cargadas desde el backend
  const [error, setError] = useState(null); // Manejo de errores
  const [form, setForm] = useState({
    region: "",
    rango_horario: "",
    max_carbon_impact: "",
  }); // Respuestas del usuario
  const [resultados, setResultados] = useState([]); // Tarifas filtradas

  // Cargar todas las tarifas desde el backend al montar el componente
  const cargarTarifas = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/tarifas`);
      if (!response.ok) {
        throw new Error("Error al cargar las tarifas.");
      }
      const data = await response.json();
      setTarifas(data); // Guardar tarifas en el estado
      console.log("Tarifas cargadas desde el backend:", data);
    } catch (err) {
      setError("No se pudieron cargar las tarifas. Inténtalo más tarde.");
      console.error(err);
    }
  };

  useEffect(() => {
    cargarTarifas(); // Ejecutar la carga de tarifas al iniciar el componente
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Filtrar y calcular las tarifas que mejor se ajustan al usuario
  const calcularMejoresTarifas = () => {
    console.log("Botón presionado: calculando mejores tarifas...");
    console.log("Estado del formulario:", form);
  
    if (!form.region || !form.rango_horario || !form.max_carbon_impact) {
      alert("Por favor, completa todas las preguntas antes de continuar.");
      return;
    }
  
    // Función para evaluar cuántas prioridades cumple una tarifa
    const evaluarPrioridades = (tarifa) => {
      let coincidencias = 0;
      if (tarifa.region.toLowerCase() === form.region.toLowerCase()) coincidencias++;
      if (
        tarifa.rango_horario_bajo &&
        tarifa.rango_horario_bajo.includes(form.rango_horario)
      )
        coincidencias++;
      if (tarifa.carbon_impact_kgCO <= parseFloat(form.max_carbon_impact)) coincidencias++;
      return coincidencias;
    };
  
    // Separar tarifas por número de prioridades cumplidas
    const tarifasConPrioridades = tarifas.map((tarifa) => ({
      ...tarifa,
      coincidencias: evaluarPrioridades(tarifa),
    }));
  
    console.log("Tarifas evaluadas con prioridades:", tarifasConPrioridades);
  
    // Filtrar por 3 coincidencias
    let tarifasFiltradas = tarifasConPrioridades.filter(
      (tarifa) => tarifa.coincidencias === 3
    );
  
    // Si no hay tarifas con 3 coincidencias, buscar con 2
    if (tarifasFiltradas.length === 0) {
      tarifasFiltradas = tarifasConPrioridades.filter(
        (tarifa) => tarifa.coincidencias === 2
      );
    }
  
    // Si no hay tarifas con 2 coincidencias, buscar con 1
    if (tarifasFiltradas.length === 0) {
      tarifasFiltradas = tarifasConPrioridades.filter(
        (tarifa) => tarifa.coincidencias === 1
      );
    }
  
    console.log("Tarifas seleccionadas después de flexibilizar prioridades:", tarifasFiltradas);
  
    // Ordenar por precio y seleccionar las 3 mejores
    const mejoresTarifas = tarifasFiltradas
      .sort((a, b) => a.precio_kw_hora - b.precio_kw_hora)
      .slice(0, 3);
  
    console.log("Las 3 mejores tarifas seleccionadas:", mejoresTarifas);
  
    setResultados(mejoresTarifas); // Guardar resultados en el estado
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h1>Comparar Tarifas</h1>

      {/* Formulario de preguntas */}
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

      {/* Resultados */}
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
                <strong>{tarifa.nombre_tarifa}</strong>: ${tarifa.precio_kw_hora} por kWh
              </p>
              <p>Región: {tarifa.region}</p>
              <p>Impacto Carbono: {tarifa.carbon_impact_kgCO} kgCO</p>
              <p>Rango Horario: {tarifa.rango_horario_bajo || "No especificado"}</p>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje si no hay resultados */}
      {resultados.length === 0 && <p>No se encontraron tarifas que coincidan con tus preferencias.</p>}

      {/* Mostrar errores de carga */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CompararTarifas;


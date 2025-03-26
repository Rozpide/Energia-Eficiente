/*import React, { useState, useEffect } from "react";

const TarifaElectricaList = ({ proveedorId, password }) => {
    const [tarifas, setTarifas] = useState([]);
    const [editTarifaId, setEditTarifaId] = useState(null); // ID de la tarifa que se está editando
    const [form, setForm] = useState({
        proveedor_id_fk: "",
        registro_hora_fecha_tarifa: "",
        precio_kw_hora: "",
        region: "",
        carbon_impact_kgCO: "",
        nombre_tarifa: "",
        rango_horario_bajo: ""
    });
    const [showModal, setShowModal] = useState(false); // Modal para edición
    const [error, setError] = useState("");

    // Función para cargar la lista de tarifas
    const cargarTarifas = () => {
        fetch(`${process.env.BACKEND_URL}/api/tarifas`)
            .then((response) => response.json())
            .then((data) => setTarifas(data))
            .catch((error) => console.error("Error al cargar tarifas:", error));
    };

    // Llama a cargarTarifas al inicializar el componente
    useEffect(() => {
        cargarTarifas();
    }, []);

    const añadirTarifa = (event) => {
        event.preventDefault();
      
        // Validación de campos del formulario
        if (!form.proveedor_id_fk || !form.registro_hora_fecha_tarifa || !form.precio_kw_hora) {
          alert("Por favor, completa todos los campos obligatorios.");
          return;
        }
      
        fetch(`${process.env.BACKEND_URL}/api/tarifas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Proveedor-ID": proveedorId, // ID del proveedor autenticado
            "Proveedor-Password": password // Contraseña del proveedor autenticado
          },
          body: JSON.stringify(form), // Incluimos los datos del formulario
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("No tienes permiso para añadir esta tarifa.");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Tarifa añadida correctamente:", data);
            cargarTarifas(); // Recargar la lista de tarifas tras añadir una nueva
            setForm({
              proveedor_id_fk: "",
              registro_hora_fecha_tarifa: "",
              precio_kw_hora: "",
              region: "",
              carbon_impact_kgCO: "",
              nombre_tarifa: "",
              rango_horario_bajo: "",
            });
            alert("Tarifa añadida exitosamente.");
          })
          .catch((error) => {
            console.error("Error al añadir tarifa:", error);
            setError("No se pudo añadir la tarifa. Verifica tu autenticación.");
          });
      };
      

    const eliminarTarifa = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta tarifa?")) {
            fetch(`${process.env.BACKEND_URL}/api/tarifas/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Proveedor-ID": proveedorId,
                    "Proveedor-Password": password,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No tienes permiso para eliminar esta tarifa.");
                    }
                    cargarTarifas(); // Recarga la lista después de eliminar
                    alert("Tarifa eliminada exitosamente.");
                })
                .catch((error) => {
                    console.error("Error al eliminar tarifa:", error);
                    setError("No se pudo eliminar la tarifa. Verifica tu autenticación.");
                });
        }
    };

    const handleEditClick = (tarifa) => {
        setEditTarifaId(tarifa.id);
        setForm({
            proveedor_id_fk: tarifa.proveedor_id_fk,
            registro_hora_fecha_tarifa: tarifa.registro_hora_fecha_tarifa,
            precio_kw_hora: tarifa.precio_kw_hora,
            region: tarifa.region,
            carbon_impact_kgCO: tarifa.carbon_impact_kgCO,
            nombre_tarifa: tarifa.nombre_tarifa,
            rango_horario_bajo: tarifa.rango_horario_bajo || ""
        });
        setShowModal(true);
    };

    const actualizarTarifa = (event) => {
        event.preventDefault();
        fetch(`${process.env.BACKEND_URL}/api/tarifas/${editTarifaId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Proveedor-ID": proveedorId,
                "Proveedor-Password": password,
            },
            body: JSON.stringify(form),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No tienes permiso para actualizar esta tarifa.");
                }
                cargarTarifas();
                setShowModal(false);
                setEditTarifaId(null);
                alert("Tarifa actualizada exitosamente.");
            })
            .catch((error) => {
                console.error("Error al actualizar tarifa:", error);
                setError("No se pudo actualizar la tarifa. Verifica tu autenticación.");
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleCancel = () => {
        setShowModal(false);
        setEditTarifaId(null);
    };

    return (
        <div>
            <h2>Lista de Tarifas Eléctricas</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            
            <form onSubmit={añadirTarifa} style={{ marginBottom: "2rem", textAlign: "center" }}>
                <h3>Añadir Tarifa</h3>
                <input
                    type="number"
                    name="proveedor_id_fk"
                    placeholder="ID del Proveedor"
                    value={form.proveedor_id_fk}
                    onChange={handleChange}
                    required
                />
                <input
                    type="datetime-local"
                    name="registro_hora_fecha_tarifa"
                    placeholder="Fecha y Hora de Registro"
                    value={form.registro_hora_fecha_tarifa}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="precio_kw_hora"
                    placeholder="Precio Kw/h"
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
                    type="text"
                    name="carbon_impact_kgCO"
                    placeholder="Impacto de Carbono (kgCO)"
                    value={form.carbon_impact_kgCO}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="nombre_tarifa"
                    placeholder="Nombre de la Tarifa"
                    value={form.nombre_tarifa}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="rango_horario_bajo"
                    placeholder="Rango Horario Bajo"
                    value={form.rango_horario_bajo}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    style={{
                        padding: "0.5rem 1rem",
                        marginTop: "10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Crear Tarifa
                </button>
            </form>

            
            

        </div>
    );
};

export default TarifaElectricaList;*/
/*
import React, { useState, useEffect } from "react";

const TarifaElectricaList = ({ proveedorId }) => {
  const [tarifas, setTarifas] = useState([]);
  const [error, setError] = useState("");

  // Función para cargar las tarifas del proveedor
  const cargarTarifas = () => {
    fetch(`${process.env.BACKEND_URL}/api/proveedores/${proveedorId}/tarifas`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar tarifas.");
        }
        return response.json();
      })
      .then((data) => setTarifas(data))
      .catch((error) => {
        console.error("Error al cargar tarifas:", error);
        setError("No se pudieron cargar las tarifas. Intenta nuevamente.");
      });
  };

  // Llama a cargarTarifas cuando el componente se monta
  useEffect(() => {
    if (proveedorId) {
      cargarTarifas();
    }
  }, [proveedorId]);

  // Función para añadir una tarifa a favoritas
  const añadirAFavoritas = (tarifaId) => {
    alert(`Tarifa con ID ${tarifaId} añadida a tus favoritas.`);
    // Aquí podrías implementar lógica adicional para enviar al backend
  };

  return (
    <div>
      <h2>Lista de Tarifas Eléctricas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      
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
            <p>Fecha y Hora Registrada: {new Date(tarifa.registro_hora_fecha_tarifa).toLocaleString()}</p>
            <button
              onClick={() => añadirAFavoritas(tarifa.id)}
              style={{
                marginTop: "10px",
                padding: "0.5rem 1rem",
                backgroundColor: "orange",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Añadir a Favoritas
            </button>
          </div>
        ))
      ) : (
        <p>No hay tarifas disponibles para este proveedor.</p>
      )}
    </div>
  );
};

export default TarifaElectricaList;*/

/*
import React, { useState, useEffect } from "react"; // Importa React y los hooks necesarios

const TarifaElectricaList = ({ proveedorId }) => {
  const [tarifas, setTarifas] = useState([]); // Estado para almacenar las tarifas
  const [error, setError] = useState(""); // Estado para manejar errores

  // Línea 6-20: Función para cargar las tarifas del proveedor
  const cargarTarifas = () => {
    fetch(`${process.env.BACKEND_URL}/api/proveedores/${proveedorId}/tarifas`) // Línea 7: URL dinámica con proveedorId
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al cargar tarifas: ${response.status} ${response.statusText}`); // Mejora para obtener más detalles
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tarifas cargadas correctamente:", data); // Registro informativo
        setTarifas(data); // Línea 12: Establece el estado con las tarifas obtenidas
      })
      .catch((error) => {
        console.error("Error al cargar tarifas:", error); // Línea 14: Manejo de errores
        setError("No se pudieron cargar las tarifas. Intenta nuevamente."); // Línea 15: Mensaje de error
      });
  };

  // Línea 22-27: Llama a cargarTarifas al montar el componente
  useEffect(() => {
    if (proveedorId) {
      cargarTarifas(); // Solo carga las tarifas si proveedorId está definido
    }
  }, [proveedorId]); // Línea 26: Dependencia para recargar si proveedorId cambia

  // Línea 29-34: Función para añadir una tarifa a favoritas
  const añadirAFavoritas = (tarifaId) => {
    alert(`Tarifa con ID ${tarifaId} añadida a tus favoritas.`); // Mensaje de alerta al usuario
    // Aquí podrías añadir lógica para enviar esta acción al backend
    console.log(`Se ha marcado la tarifa con ID ${tarifaId} como favorita.`); // Registro informativo
  };

  // Línea 36-65: Renderización del componente
  return (
    <div>
      <h2>Lista de Tarifas Eléctricas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} 
      
      
      {tarifas.length > 0 ? (
        tarifas.map((tarifa) => (
          <div
            key={tarifa.id} // Línea 42: Asigna una clave única basada en el ID de la tarifa
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
            <button
              onClick={() => añadirAFavoritas(tarifa.id)} // Línea 55: Llama a la función para marcar como favorita
              style={{
                marginTop: "10px",
                padding: "0.5rem 1rem",
                backgroundColor: "orange",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Añadir a Favoritas
            </button>
          </div>
        ))
      ) : (
        <p>No hay tarifas disponibles para este proveedor.</p>
      )}
    </div>
  );
};

export default TarifaElectricaList; // Línea 67: Exporta el componente

*/
/*-----------------------------NUEVO CODIGO-----------------------------*/

import React, { useState, useEffect } from "react";

const TarifaElectricaList = ({ proveedorId, filterFunction }) => {
  const [tarifas, setTarifas] = useState([]); // Estado para tarifas obtenidas
  const [error, setError] = useState(""); // Estado para manejar errores

  // Función para cargar las tarifas del proveedor
  const cargarTarifas = () => {
    fetch(`${process.env.BACKEND_URL}/api/proveedores/${proveedorId}/tarifas`)
      .then((response) => {
        if (!response.ok) {
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

  // Función para gestionar el botón de "Comparar"
  const compararTarifa = (tarifa) => {
    alert(`Comparando la tarifa "${tarifa.nombre_tarifa}" con tus preferencias.`);
    // Aquí podrías implementar lógica adicional, como enviar datos al backend o navegar a otra página
  };

  return (
    <div>
      <h2>Lista de Tarifas Eléctricas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar error si ocurre */}

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
            <button
              onClick={() => compararTarifa(tarifa)} // Botón para comparar la tarifa
              style={{
                marginTop: "10px",
                padding: "0.5rem 1rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ComparaAAAAAr Tarifa
            </button>
          </div>
        ))
      ) : (
        <p>No hay tarifas disponibles para este proveedor.</p> 
      )}
    </div>
  );
};

export default TarifaElectricaList;



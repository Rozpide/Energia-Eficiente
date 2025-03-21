import React, { useState, useEffect } from "react";

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

            {/* Formulario de creación */}
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

            {/* Listado de tarifas */}
            {/* Aquí se renderiza el contenido que me pasaste anteriormente para el listado y modal */}

        </div>
    );
};

export default TarifaElectricaList;

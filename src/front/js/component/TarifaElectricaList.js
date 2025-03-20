import React, { useState, useEffect } from "react";

const TarifaElectricaList = () => {
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

    // Función para cargar la lista de tarifas
    const cargarTarifas = () => {
        fetch(`${process.env.BACKEND_URL}/api/tarifas`)
            .then(response => response.json())
            .then(data => setTarifas(data))
            .catch(error => console.error("Error al cargar tarifas:", error));
    };

    // Llama a cargarTarifas al inicializar el componente
    useEffect(() => {
        cargarTarifas();
    }, []);

    const añadirTarifa = event => {
        event.preventDefault();
        fetch(`${process.env.BACKEND_URL}/api/tarifas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Tarifa añadida:", data);
                cargarTarifas();
                setForm({
                    proveedor_id_fk: "",
                    registro_hora_fecha_tarifa: "",
                    precio_kw_hora: "",
                    region: "",
                    carbon_impact_kgCO: "",
                    nombre_tarifa: "",
                    rango_horario_bajo: ""
                });
            })
            .catch(error => console.error("Error al añadir tarifa:", error));
    };

    const eliminarTarifa = id => {
        fetch(`${process.env.BACKEND_URL}/api/tarifas/${id}`, { method: "DELETE" })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                cargarTarifas(); // Recarga la lista después de eliminar
            })
            .catch(error => console.error("Error al eliminar tarifa:", error));
    };

    const handleEditClick = tarifa => {
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

    const actualizarTarifa = event => {
        event.preventDefault();
        fetch(`${process.env.BACKEND_URL}/api/tarifas/${editTarifaId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Tarifa actualizada:", data);
                cargarTarifas();
                setShowModal(false);
                setEditTarifaId(null);
            })
            .catch(error => console.error("Error al actualizar tarifa:", error));
    };

    const handleChange = event => {
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

            {/* Formulario de creación */}
            <form onSubmit={añadirTarifa} style={{ marginBottom: "2rem", textAlign: "center" }}>
                <h3>Añadir Tarifa</h3>
                {/* Campos del formulario */}
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
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {tarifas.map(tarifa => (
                    <div
                        key={tarifa.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "1rem",
                            textAlign: "center",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <p>
                            <strong>{tarifa.nombre_tarifa}</strong>
                        </p>
                        <p>Proveedor ID: {tarifa.proveedor_id_fk}</p>
                        <p>Precio Kw/h: {tarifa.precio_kw_hora}</p>
                        <p>Región: {tarifa.region}</p>
                        <p>Impacto de Carbono: {tarifa.carbon_impact_kgCO} kgCO</p>
                        <p>Rango Horario Bajo: {tarifa.rango_horario_bajo || "No especificado"}</p>
                        <div style={{ marginTop: "1rem" }}>
                            <button
                                onClick={() => eliminarTarifa(tarifa.id)}
                                style={{
                                    marginRight: "10px",
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
                            <button
                                onClick={() => handleEditClick(tarifa)}
                                style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Modificar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para modificar tarifa */}
            {showModal && (
                <div style={modalStyles}>
                    <div style={modalContentStyles}>
                        <h3>Modificar Tarifa</h3>
                        <form onSubmit={actualizarTarifa}>
                            <input
                                type="number"
                                name="proveedor_id_fk"
                                placeholder="ID del Proveedor"
                                value={form.proveedor_id_fk}
                                onChange={handleChange}
                                required
                                style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
                            />
                            <input
                                type="datetime-local"
                                name="registro_hora_fecha_tarifa"
                                placeholder="Fecha y Hora de Registro"
                                value={form.registro_hora_fecha_tarifa}
                                onChange={handleChange}
                                required
                                style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
                            />
                            <input
                                type="number"
                                name="precio_kw_hora"
                                placeholder="Precio Kw/h"
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
                                type="text"
                                name="carbon_impact_kgCO"
                                placeholder="Impacto de Carbono (kgCO)"
                                value={form.carbon_impact_kgCO}
                                onChange={handleChange}
                                required
                                style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
                            />
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
                                type="text"
                                name="rango_horario_bajo"
                                placeholder="Rango Horario Bajo"
                                value={form.rango_horario_bajo}
                                onChange={handleChange}
                                style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
                            />
                            <button
                                type="submit"
                                style={{
                                    marginRight: "10px",
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
                                type="button"
                                onClick={handleCancel}
                                style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#f44336",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TarifaElectricaList;

// Estilos del modal
const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modalContentStyles = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
};

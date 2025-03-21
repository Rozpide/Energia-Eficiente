import React, { useState } from "react";

const ProveedorForm = () => {
    const [form, setForm] = useState({
        nombre_proveedor: "",
        contacto: "",
        website: "",
        password: "", // Campo para contraseña
    });
    const [loading, setLoading] = useState(false); // Indicador de carga
    const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true); // Inicia el estado de carga
        setErrorMessage(""); // Limpia cualquier mensaje de error previo

        fetch(`${process.env.BACKEND_URL}/api/proveedores`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((response) => {
                setLoading(false); // Finaliza el estado de carga
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.error || `Error HTTP: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log("Proveedor creado:", data);
                alert("Proveedor añadido correctamente.");
                // Limpia el formulario después de la creación
                setForm({
                    nombre_proveedor: "",
                    contacto: "",
                    website: "",
                    password: "",
                });
            })
            .catch((error) => {
                setLoading(false); // Finaliza el estado de carga en caso de error
                console.error("Error al crear proveedor:", error);
                setErrorMessage(error.message); // Muestra el mensaje de error
            });
    };

    return (
        <div>
            <h2>Crear Proveedor</h2>
            <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <input
                    type="text"
                    name="nombre_proveedor"
                    placeholder="Nombre del Proveedor"
                    value={form.nombre_proveedor}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "10px", padding: "0.5rem", width: "80%" }}
                />
                <input
                    type="email" // Validación de correo automático
                    name="contacto"
                    placeholder="Correo Electrónico"
                    value={form.contacto}
                    onChange={handleChange}
                    required
                    style={{ marginBottom: "10px", padding: "0.5rem", width: "80%" }}
                />
                <input
                    type="url"
                    name="website"
                    placeholder="Sitio Web"
                    value={form.website}
                    onChange={handleChange}
                    style={{ marginBottom: "10px", padding: "0.5rem", width: "80%" }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password" // Mejora de seguridad
                    style={{ marginBottom: "10px", padding: "0.5rem", width: "80%" }}
                />
                <button
                    type="submit"
                    disabled={loading} // Deshabilita el botón mientras se procesa la solicitud
                    style={{
                        padding: "0.5rem 1rem",
                        marginTop: "10px",
                        backgroundColor: loading ? "#ccc" : "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Creando..." : "Crear Proveedor"}
                </button>
            </form>
            {errorMessage && (
                <div
                    style={{
                        marginTop: "10px",
                        color: "red",
                        fontWeight: "bold",
                    }}
                >
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default ProveedorForm;

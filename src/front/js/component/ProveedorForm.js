import React, { useState } from "react";

const ProveedorForm = () => {
    const [form, setForm] = useState({
        nombre_proveedor: "",
        contacto: "",
        website: "",
        password: "", // Nuevo campo
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${process.env.BACKEND_URL}/api/proveedores`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
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
                console.error("Error al crear proveedor:", error);
                alert("Error al crear proveedor. Por favor, verifica los datos e inténtalo nuevamente.");
            });
    };

    return (
        <div>
            <h2>Crear Proveedor</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre_proveedor"
                    placeholder="Nombre del Proveedor"
                    value={form.nombre_proveedor}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="contacto"
                    placeholder="Contacto"
                    value={form.contacto}
                    onChange={handleChange}
                    required
                />
                <input
                    type="url"
                    name="website"
                    placeholder="Sitio Web"
                    value={form.website}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
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
                    Crear Proveedor
                </button>
            </form>
        </div>
    );
};

export default ProveedorForm;

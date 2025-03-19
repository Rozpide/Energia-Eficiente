import React, { useState } from "react";

const ProveedorForm = () => {
    const [form, setForm] = useState({
        nombre_proveedor: "",
        contacto: "",
        website: "",
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();
            fetch(`${process.env.BACKEND_URL}/api/proveedores`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then(response => response.json())
            .then(data => console.log("Proveedor creado:", data))
            .catch(error => console.error("Error al crear proveedor:", error));
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
                <button type="submit">Crear Proveedor</button>
            </form>
        </div>
    );
};

export default ProveedorForm;

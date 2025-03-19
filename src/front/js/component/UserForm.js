import React, { useState } from "react";

const UserForm = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        is_active: true,
    });

    // Manejo de los cambios en los inputs
    const handleChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    // Enviar el formulario
    const handleSubmit = event => {
        event.preventDefault();
        fetch(`${process.env.BACKEND_URL}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then(response => response.json())
            .then(data => console.log("Usuario creado:", data))
            .catch(error => console.error("Error al crear usuario:", error));
    };

    // Renderizar el formulario
    return (
        <div>
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                />
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
};

export default UserForm;

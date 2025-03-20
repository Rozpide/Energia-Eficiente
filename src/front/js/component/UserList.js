import React, { useState, useEffect } from "react";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null); // ID del usuario que se está editando
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [showModal, setShowModal] = useState(false); // Modal para edición
    const [warningModal, setWarningModal] = useState(false); // Modal para advertencia de relaciones
    const [warningMessage, setWarningMessage] = useState(""); // Mensaje de advertencia

    // Función para cargar la lista de usuarios
    const cargarUsuarios = () => {
        fetch(`${process.env.BACKEND_URL}/api/users`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error al cargar usuarios:", error));
    };

    // Llama a cargarUsuarios al inicializar el componente
    useEffect(() => {
        cargarUsuarios();
    }, []);

    const añadirUsuario = event => {
        event.preventDefault();
        fetch(`${process.env.BACKEND_URL}/api/users`, {
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
                console.log("Usuario añadido:", data);
                cargarUsuarios();
                setForm({ name: "", email: "", password: "" });
            })
            .catch(error => console.error("Error al añadir usuario:", error));
    };

    const eliminarUsuario = id => {
        fetch(`${process.env.BACKEND_URL}/api/users/${id}`, { method: "DELETE" })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        const relatedElements = err.error.split(": ")[1] || "elementos relacionados";
                        throw new Error(`Antes de eliminar el usuario, debe eliminar: ${relatedElements}`);
                    });
                }
                cargarUsuarios(); // Recarga la lista después de eliminar
            })
            .catch(error => {
                console.error("Error al eliminar usuario:", error);
                setWarningMessage(error.message); // Establece el mensaje dinámico
                setWarningModal(true); // Muestra el modal de advertencia
            });
    };

    const handleEditClick = user => {
        setEditUserId(user.id);
        setForm({
            name: user.name,
            email: user.email,
            password: "", // No mostrar la contraseña actual
        });
        setShowModal(true);
    };

    const actualizarUsuario = event => {
        event.preventDefault();
        fetch(`${process.env.BACKEND_URL}/api/users/${editUserId}`, {
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
                console.log("Usuario actualizado:", data);
                cargarUsuarios();
                setShowModal(false);
                setEditUserId(null);
            })
            .catch(error => console.error("Error al actualizar usuario:", error));
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleCancel = () => {
        setShowModal(false);
        setEditUserId(null);
    };

    const closeWarningModal = () => {
        setWarningModal(false);
    };

    return (
        <div>
            <h2>Lista de Usuarios</h2>

            {/* Formulario de creación de usuario */}
            <form onSubmit={añadirUsuario} style={{ marginBottom: "2rem", textAlign: "center" }}>
                <h3>Añadir Usuario</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ marginRight: "10px", padding: "0.5rem", width: "20%" }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ marginRight: "10px", padding: "0.5rem", width: "20%" }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{ marginRight: "10px", padding: "0.5rem", width: "20%" }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Crear Usuario
                </button>
            </form>

            {/* Listado de usuarios */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {users.map(user => (
                    <div
                        key={user.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "1rem",
                            textAlign: "center",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <p>
                            <strong>{user.name}</strong> ({user.email})
                        </p>
                        <div style={{ marginTop: "1rem" }}>
                            <button
                                onClick={() => eliminarUsuario(user.id)}
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
                                onClick={() => handleEditClick(user)}
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

            {/* Modal para advertencia */}
            {warningModal && (
                <div style={modalStyles}>
                    <div style={modalContentStyles}>
                        <h3>No se puede eliminar el usuario</h3>
                        <p>{warningMessage}</p> {/* Mensaje dinámico */}
                        <button
                            onClick={closeWarningModal}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#f44336",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para modificar usuario */}
            {showModal && (
                <div style={modalStyles}>
                    <div style={modalContentStyles}>
                        <h3>Modificar Usuario</h3>
                        <form onSubmit={actualizarUsuario}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                value={form.name}
                                onChange={handleChange}
                                required
                                style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                value={form.password}
                                onChange={handleChange}
                                required
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
    
    export default UserList;
    
    // Estilos del modal
    const modalStyles = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro transparente
        display: "flex",
        justifyContent: "center", // Centrado horizontal
        alignItems: "center", // Centrado vertical
        zIndex: 1000, // Coloca el modal por encima de otros elementos
    };
    
    const modalContentStyles = {
        backgroundColor: "white", // Fondo blanco del modal
        padding: "20px", // Espaciado interno
        borderRadius: "8px", // Bordes redondeados
        width: "400px", // Ancho del modal
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Sombra para resaltar el modal
        textAlign: "center", // Centrado del texto dentro del modal
    };
    
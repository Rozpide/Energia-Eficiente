import React, { useState } from "react";
import TarifaElectricaList from "../component/TarifaElectricaList";

const TarifaPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para control de acceso
    const [showLoginModal, setShowLoginModal] = useState(false); // Estado para mostrar el modal
    const [loginForm, setLoginForm] = useState({ proveedorId: "", password: "" });

    const handleLoginChange = event => {
        const { name, value } = event.target;
        setLoginForm({ ...loginForm, [name]: value });
    };

    const handleLogin = () => {
        fetch("http://localhost:5000/api/login_proveedor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginForm),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("ID o contraseña inválidos");
                }
                return response.json();
            })
            .then(data => {
                setIsAuthenticated(true); // Login exitoso
                setShowLoginModal(false); // Cerrar modal
                alert("Acceso otorgado al formulario de tarifas.");
            })
            .catch(error => {
                console.error("Error al iniciar sesión:", error);
                alert("ID o contraseña incorrectos.");
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Gestión de Tarifas Eléctricas</h1>

            {/* Listado de tarifas eléctricas */}
            <TarifaElectricaList />

            {/* Botón para iniciar sesión */}
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={() => setShowLoginModal(true)}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Acceso Proveedores
                </button>
            </div>

            {/* Formulario para añadir tarifa (bloqueado inicialmente) */}
            {isAuthenticated && (
                <form style={{ marginTop: "20px" }}>
                    <h3>Añadir Tarifa</h3>
                    <input
                        type="text"
                        name="nombre_tarifa"
                        placeholder="Nombre de la Tarifa"
                        required
                        style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
                    />
                    <input
                        type="number"
                        name="precio_kw_hora"
                        placeholder="Precio Kw/h"
                        required
                        style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
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
                        Añadir Tarifa
                    </button>
                </form>
            )}

            {/* Modal de login */}
            {showLoginModal && (
                <div style={modalStyles}>
                    <div style={modalContentStyles}>
                        <h3>Iniciar sesión - Acceso Proveedores</h3>
                        <input
                            type="text"
                            name="proveedorId"
                            placeholder="ID del proveedor"
                            value={loginForm.proveedorId}
                            onChange={handleLoginChange}
                            required
                            style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            required
                            style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
                        />
                        <button
                            onClick={handleLogin}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#4CAF50",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Iniciar sesión
                        </button>
                        <button
                            onClick={() => setShowLoginModal(false)}
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default TarifaPage;

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

import React, { useState } from "react";
import TarifaElectricaList from "../component/TarifaElectricaList";

const TarifaPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para control de acceso
    const [proveedorId, setProveedorId] = useState(""); // Almacena el ID del proveedor autenticado
    const [password, setPassword] = useState(""); // Almacena la contraseña del proveedor autenticado
    const [showLoginModal, setShowLoginModal] = useState(false); // Estado para mostrar el modal
    const [loginForm, setLoginForm] = useState({ proveedorId: "", password: "" });

    const handleLoginChange = (event) => {
        const { name, value } = event.target;
        setLoginForm({ ...loginForm, [name]: value });
    };

    const handleLogin = () => {
        fetch(`${process.env.BACKEND_URL}/api/login_proveedor`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginForm),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("ID o contraseña inválidos");
                }
                return response.json();
            })
            .then(() => {
                setProveedorId(loginForm.proveedorId);
                setPassword(loginForm.password);
                setIsAuthenticated(true); // Login exitoso
                setShowLoginModal(false); // Cerrar modal
                alert("Inicio de sesión exitoso. Ahora puedes gestionar tarifas.");
            })
            .catch((error) => {
                console.error("Error al iniciar sesión:", error);
                alert("ID o contraseña incorrectos.");
            });
    };

    const handleLogout = () => {
        setProveedorId(""); // Limpiar ID del proveedor
        setPassword(""); // Limpiar contraseña
        setIsAuthenticated(false); // Cerrar sesión
        alert("Sesión cerrada.");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Gestión de Tarifas Eléctricas</h1>

            {/* Login y Logout */}
            {!isAuthenticated ? (
                <>
                    {/* Botón para mostrar modal de login */}
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
                </>
            ) : (
                <>
                    <p>
                        Bienvenido, proveedor <strong>{proveedorId}</strong>
                    </p>
                    <button
                        onClick={handleLogout}
                        style={{
                            marginBottom: "20px",
                            padding: "0.5rem 1rem",
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Cerrar sesión
                    </button>
                </>
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

            {/* Listado de tarifas */}
            {isAuthenticated && (
                <TarifaElectricaList proveedorId={proveedorId} password={password} />
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

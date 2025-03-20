import React, { useState } from "react";

const ProveedorLogin = ({ onLogin }) => {
    const [proveedorId, setProveedorId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        fetch(`${process.env.BACKEND_URL}/api/login_proveedor`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ proveedorId, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("ID o contraseña inválidos");
                }
                return response.json();
            })
            .then((data) => {
                onLogin(proveedorId, password); // Informar al componente padre sobre el login exitoso
                setError(""); // Limpiar errores
                alert("Inicio de sesión exitoso");
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div style={{ margin: "20px 0" }}>
            <h3>Iniciar sesión - Proveedores</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                placeholder="ID del proveedor"
                value={proveedorId}
                onChange={(e) => setProveedorId(e.target.value)}
                style={{ marginBottom: "10px", padding: "0.5rem", width: "100%" }}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </div>
    );
};

export default ProveedorLogin;

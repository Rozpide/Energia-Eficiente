import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        localStorage.removeItem("access_token"); // Eliminar el token
        alert("Sesión cerrada correctamente.");
        navigate("/"); // Redirigir a la página de inicio
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Gestión Energética</span>
                </Link>
                <div className="ml-auto">
                    <Link to="/users">
                        <button className="btn btn-primary">Usuarios</button>
                    </Link>
                    <Link to="/proveedores" className="ml-2">
                        <button className="btn btn-secondary">Proveedores</button>
                    </Link>
                    <Link to="/tarifas" className="ml-2">
                        <button className="btn btn-success">Tarifas</button>
                    </Link>
                    <Link to="/proveedor/dashboard" className="ml-2">
                        <button className="btn btn-info">Dashboard</button>
                    </Link>
                    <button className="btn btn-danger ml-2" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};


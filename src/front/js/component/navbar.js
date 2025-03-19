import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
                </div>
            </div>
        </nav>
    );
};

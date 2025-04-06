import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/src/front/img/logo_energia_eficiente.png"; // Importar la imagen del logo

export const Navbar = ({ rol, cerrarSesion }) => {
  const navigate = useNavigate();

  if (!rol) return null; // Oculta el navbar si no hay rol seleccionado

  return (
    <nav className="navbar navbar-light bg-rosado">
      <div className="container d-flex ">
        <Link to="/" className="me-3">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid logo-navbar"
            style={{
              maxWidth: "70px",
              marginBottom: "20px",
              borderRadius: "30%",
            }}
          />
        </Link>

        <Link to="/">
          <span className="navbar-brand mb-0 h1">Gestión Energética </span>
        </Link>
        <div className="ml-auto">
          {rol === "Usuario" && (
            <>
              <Link to="/users">
                <button className="btn btn-primary">ALTA Usuarios</button>
              </Link>
              <Link to="/tarifas" className="ml-2">
                <button className="btn btn-success">Tarifas</button>
              </Link>
              <Link to="/comparar-tarifas" className="ml-2">
                <button className="btn btn-info">Comparar Tarifas</button>
              </Link>
            </>
          )}
          {rol === "Proveedor" && (
            <>
              <Link to="/proveedores">
                <button className="btn btn-secondary">ALTA Proveedor</button>
              </Link>
              <Link to="/tarifas" className="ml-2">
                <button className="btn btn-success">Tarifas</button>
              </Link>
              <Link to="/proveedor/dashboard" className="ml-2">
                <button className="btn btn-info">Dashboard Proveedor</button>
              </Link>
            </>
          )}
          <button className="btn btn-danger ml-2" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

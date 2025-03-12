import React, { useContext, useEffect } from "react";
import logo from "/workspaces/PupperEatsAppreact-flask-hello-deprecated/src/front/img/Icono puppereats.png";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Context } from "../store/appContext";
import { FaUserCircle, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const { user } = store;

    useEffect(() => {
        console.log("Usuario en navbar:", user);
    }, [user]);

    return (
        <nav className="navbar navbar-expand-lg shadow-lg" style={{ 
            background: "linear-gradient(180deg, #FBD989 5%, #F4C4A4 40%, #EC955B 95%)",
            padding: "15px 30px",
            borderRadius: "0px"
        }}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <img src={logo} alt="Logo" style={{ 
                        height: "60px", 
                        border: "3px solid #000", 
                        borderRadius: "10px", 
                        padding: "3px" 
                    }} />
                    <span className="fw-bold text-dark" style={{ fontSize: "1.5rem", marginLeft: "10px" }}>Pupper Eats</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex me-auto" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar comida..." aria-label="Search" style={{ borderRadius: "8px", height: "30px", width: "250px", fontSize: "1.1rem" }} />
                        <button className="btn btn-outline-dark" type="submit" style={{ borderRadius: "8px", padding: "2px 6px" }}>
                            <CiSearch size={12} />
                        </button>
                    </form>
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item m-2">
                            <a className="nav-link fw-semibold" href="#">Caninos</a>
                        </li>
                        <li className="nav-item m-2">
                            <a className="nav-link fw-semibold" href="#">Felinos</a>
                        </li>
                        <li className="nav-item m-2">
                            <a className="nav-link fw-semibold" href="#">Exóticos</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav d-flex align-items-center gap-2">
                        {user ? (
                            <>
                                <Link to="/perfilUsuario" className="text-dark text-decoration-none d-flex align-items-center">
                                    <FaUserCircle size={24} className="me-1" />
                                    <span className="fw-semibold">Perfil</span>
                                </Link>
                                <Link to="/cesta" className="btn btn-warning d-flex align-items-center">
                                    <FaShoppingCart size={18} className="me-1" /> Cesta
                                </Link>
                                <button className="btn btn-light text-muted border-0 d-flex align-items-center" onClick={actions.logout}>
                                    <FaSignOutAlt size={16} className="me-1" /> Salir
                                </button>
                            </>
                        ) : (
                            <Link to="/loginSignup" className="btn btn-dark">Registro / Inicio</Link>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
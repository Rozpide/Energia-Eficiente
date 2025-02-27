import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-black navbar-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-decoration-none">MEDagenda</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link active" aria-current="page">USER</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/loginDoc" className="nav-link">DOCTOR</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/registroPacientes" className="nav-link">Registo Pacientes Nuevos</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="specialtiesDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Especialidades
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="specialtiesDropdown">
                                <li><Link className="dropdown-item" to="/medicina-general">Medicina General</Link></li>
                                <li><Link className="dropdown-item" to="/pediatria">Pediatría</Link></li>
                                <li><Link className="dropdown-item" to="/ginecologia">Ginecología y Obstetricia</Link></li>
                                <li><Link className="dropdown-item" to="/cardiologia">Cardiología</Link></li>
                                <li><Link className="dropdown-item" to="/dermatologia">Dermatología</Link></li>
                                <li><Link className="dropdown-item" to="/ortopedia">Ortopedia y Traumatología</Link></li>
                                <li><Link className="dropdown-item" to="/neurologia">Neurología</Link></li>
                                <li><Link className="dropdown-item" to="/oftalmologia">Oftalmología</Link></li>
                                <li><Link className="dropdown-item" to="/otorrinolaringologia">Otorrinolaringología</Link></li>
                                <li><Link className="dropdown-item" to="/endocrinologia">Endocrinología</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

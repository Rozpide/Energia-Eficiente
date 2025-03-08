import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom' 


export const Navbar = () => {
    const {actions, store } = useContext(Context); // Acceder al estado global de Flux
    const role = store.user?.role;
    const navigate = useNavigate();
    const handleLogout = () => {
        actions.logOut();
        navigate("/logIn"); 
    };
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
                        {!role && (
                            <>
                                <li className="nav-item">
                                    <Link to="/logInDoc" className="nav-link active">LogIn Doctor</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/logInAdmin" className="nav-link active">LogIn Admin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link active">LogIn</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/registroPacientes" className="nav-link active">Registrate</Link>
                                </li>
                            </>
                        )}
                        {role === "doctor" && (
                            <li className="nav-item">
                                <Link to="/doctor/dashboard" className="nav-link">Dashboard Doctor</Link>
                            </li>
                        )}
                        {role === "admin" && (
                            <li className="nav-item">
                                <Link to="/panel/admin" className="nav-link">Panel Admin</Link>
                            </li>
                        )}
                        {role === "user" && (
                            <>
                                <li className="nav-item">
                                    <Link to="/edituser" className="nav-link">Mi Perfil</Link>
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
                            </>
                        )}
                        {role && (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout}>Cerrar Sesión</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

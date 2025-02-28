import React from "react";
import { Link } from "react-router-dom";
import "/src/front/styles/sidebar.css";


export const Sidebar = () => {
    return (
        <div className="sidebar">
            <div>
                <Link to="/" className="d-flex justify-content-evenly text-white text-decoration-none">
                    <span className="fs-4">Optima</span>
                    <img src="" alt="logo" width="32" height="32" />
                </Link>
            </div>
            <div className="d-flex flex-column">
                <p className="p-2">Welcome
                    <br></br>
                    <span className="p-2">slogan</span>
                </p>
                <div className="d-flex ">
                    <img src="https://github.com/mdo.png" alt="User" width="32" height="32" />
                    <p className="p-2">@usuario-db</p>
                </div>
            </div>

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link active">
                        <i className="bi bi-person-vcard-fill"></i> <span>Cuentas</span>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard" className="nav-link">
                        <i className="bi bi-graph-up"></i> <span>Movimientos</span>
                    </Link>
                </li>


                <hr />


                <li>
                    <Link to="/logout" className="nav-link">
                        <i className="bi bi-question-circle"></i> <span>FAQs</span>
                    </Link>
                </li>
                <li>
                    <Link to="/logout" className="nav-link">
                        <i className="bi bi-box-arrow-left"></i> <span>Sign Out</span>
                    </Link>
                </li>
            </ul>
        </div>

    );
};

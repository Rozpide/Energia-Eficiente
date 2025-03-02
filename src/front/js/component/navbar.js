import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";


export const Navbar = () => {

	const [searchTerm, setSearchTerm] = useState("");
	const handleSearch = () => {
		alert(`Buscando: ${searchTerm}`); //alerta de búsqueda
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearch(); // Llama a la función de búsqueda al presionar Enter
		}
	};

	return (
		<nav className="navbar py-0">
			<div className="container-fluid px-3 d-flex justify-content-between">
				<Link to="/"  style={{ textDecoration: 'none' }}>
				<a className="navbar-brand" href="#">
					<i className="circle fa-solid fa-record-vinyl"></i>
					RetroVinyl
				</a>
				</Link>
				{
					localStorage.getItem("token") ?
						<div className="d-flex dropdown">
							<div class="search input-group mb-3">
								<input type="text"
									className="form-control"
									placeholder="Escribe para buscar"
									aria-describedby="basic-addon2"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)} // Actualizamos el estado cuando hay cambios
									onKeyDown={handleKeyDown} // Enter
								/>
								<div class="input-group-append">
									<button onClick={handleSearch}
										className="search btn btn-outline-danger">
										<i class="fa-solid fa-magnifying-glass"></i>
									</button>
								</div>
							</div>
							<button className="user btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								Usuario
							</button>
							<ul className="dropdown-menu dropdown-menu-end">
								<li><a className="dropdown-item" href="#">Perfil</a></li>
							    <Link to="/favoritos"  style={{ textDecoration: 'none' }}>
								<li><a className="dropdown-item" href="#">Favoritos</a></li>
								</Link>
								<li><a className="dropdown-item" href="#">Pedidos</a></li>
								<Link to="/"  style={{ textDecoration: 'none' }}>
								<li><a className="dropdown-item" href="#">Cerrar Sesión</a></li>
								</Link>
							</ul>
						</div>
						:
						<div className="buttons">
							<Link to="/register"  style={{ textDecoration: 'none' }}>
							<button className="register btn btn-outline-danger">Registarse</button>
							</Link>
							<Link to="/login"  style={{ textDecoration: 'none' }}>
							<button className="login btn btn-danger mx-2">Iniciar Sesión</button>
							</Link>
						</div>
				}
			</div>
		</nav>
	);
};


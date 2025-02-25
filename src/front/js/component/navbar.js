import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-black navbar-dark">
			<div className="container-fluid">
				<Link to="/">
				<a className="navbar-brand text-decoration-none">MEDagenda</a>
				</Link>
				<div className="collapse navbar-collapse text-decoration-none" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
						<Link to="/login">
						<a className="nav-link active" aria-current="page">USER</a>
						</Link>
						</li>
						<li className="nav-item">
						<Link to="/loginDoc">
						<a className="nav-link">DOCTOR</a>
						</Link>	
						</li>
						<li className="nav-item">
						<Link to="/singUp">
						<a className="nav-link">Sing Up</a>
						</Link>	
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

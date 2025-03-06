import React from "react";
import { Link } from "react-router-dom";
import { Thememode } from "./Thememode";
import logo from "../store/logo-sin-fondo.jpg";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light p-0">
			<div className="container-fluid margintop d-flex align-items-center">
				<Link to="/">
					<img
						src={logo}
						className="navbar-brand backnavbar"
						style={{ width: "3rem" }}
						alt="Logo"
					/>
				</Link>

				<ul className="navbar-nav d-flex flex-row w-75 justify-content-center gap-5 fs-5 textcolors">
					<li className="nav-item ms-5 me-5 textcolors">
						<Link className="nav-link" to="/notes">
							Notes
						</Link>
					</li>
					<li className="nav-item ms-5 me-5">
						<Link className="nav-link" to="/habit-tracker">
							Habit-Tracker
						</Link>
					</li>
					<li className="nav-item ms-5 me-5">
						<Link className="nav-link" to="/projects">
							Projects
						</Link>
					</li>
				</ul>

				<div className="ms-auto">
					<Link to="/login">
						<button className="me-5 backbutton border rounded text-black p-1 w-100">
							Login
						</button>
					</Link>
				</div>
			</div>
			{/* <Thememode /> */}
		</nav>
	);
};

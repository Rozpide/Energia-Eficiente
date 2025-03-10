import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Thememode } from "./Thememode"
import logo from "../../img/logoFinal.jpg"
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		
	}, []);



	return (
		<nav className="navbar navbar-light bg-light p-0">
			<div className="container-fluid background-color margintop d-flex align-items-center">
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
						{store.auth ? <Link className="nav-link" to="/profile">
							Profile
						</Link> : null}
					</li>
					<li className="nav-item ms-5 me-5 textcolors">
						{store.auth ? <Link className="nav-link" to="/notes">
							Notes
						</Link> : null}
					</li>
					<li className="nav-item ms-5 me-5">
						{store.auth ? <Link className="nav-link" to="/habit-tracker">
							Habit-Tracker
						</Link> : null}
					</li>
					<li className="nav-item ms-5 me-5">
						{store.auth ? <Link className="nav-link" to="/projects">
							Projects
						</Link> : null}
					</li>
				</ul>

				<div className="ms-1">
					{!store.auth && ( // 🔥 Aquí se oculta el botón si el usuario está autenticado
						<Link to="/login">
							<button className="me-5 backbutton border rounded text-black p-1 w-100">
								Login
							</button>
						</Link>
					)}

					{store.auth && (<div className="dropdown ">
						<button className=" me-2 backbutton border rounded text-black p-1 w-100 dropdown-toggle"  aria-expanded="false" type="button" data-bs-toggle="dropdown">
							<i className="fa-solid fa-gear"></i>
						</button>
						<ul class="dropdown-menu  dropdown-menu-end">
						
							<li><button className="btn btn-light w-100" type="button">Tema</button></li>
							<li><button className="btn btn-light w-100" type="button"><Link to="/editprofile">Edit Profile</Link></button></li>
							<li><button onClick={() => {
								localStorage.removeItem("token");
								actions.verifyToken();
								navigate("/");
							}} className="btn btn-light w-100 " type="button">Logout</button></li>
						</ul>
					</div>)}
				</div>
			</div>
			{/* <Thememode /> */}
		</nav>
	);
};

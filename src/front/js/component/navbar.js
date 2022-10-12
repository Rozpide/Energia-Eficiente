import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import rigoImageUr from "../../img/LogoSample_ByTailorBrands.jpg";
import { Context } from "../store/appContext";
export const Navbar = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.GetValidacion(localStorage.getItem("token"));
	  }, []);
	return (
		<nav className="navbar navb " id="navbar">
			<div className="container coco d-flex justify-content-center">
				
				
			<div className="fle">
			<Link to="/">
			<button type="button" class="btn coc ">HOME</button>
					
				</Link>
				<Link to="/productos">
				<button type="button" class="btn coc ">RECETAS</button>
				</Link>
				 <Link to="/sub">
				<button type="button" class="btn coc ">PLANES</button>
				</Link>
				<Link to="/contacto">
				<button type="button" class="btn coc ">CONTACTO</button>
				</Link>
			</div>
			</div>
			{store.login ? (
				<div className="" id="iconos">
					<Link to="/demo">
				<i class="fa-solid fa-user" id="loginicon"></i>
				</Link>
				
				</div>
			):(<div><Link to="/demo">Haz login</Link></div>)}
		</nav>
	);
};

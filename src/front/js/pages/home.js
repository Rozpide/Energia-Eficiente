import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="container">
			<div className="card w-50 text-bg-dark">
				<img src="https://media.istockphoto.com/id/517051420/es/foto/desconocido-retrato-de-un-hombre-sosteniendo-un-estetoscopio-m%C3%A9dico-un.jpg?s=612x612&w=0&k=20&c=OfOND4qSom_xEC_IuyHKf9pKO4H6z9wWTzCFpUJY0Ec=" 
				className="card-img" alt="imagen"/>
					<div className="card-img-overlay">
						<h5 className="card-title">MEDagenda</h5>
						<p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
						<p className="card-text"><small>Los mejores profesionales a tu disposicion</small></p>
					</div>
			</div>
			<Link to="/login">
				<button classNameName="btn btn-primary btn-lg">Log In</button>
			</Link>


		</div>
	);
};

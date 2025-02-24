import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center mt-5">
			<h1> Hola</h1>
			<Link to="/login">
				<button className="btn btn-primary btn-lg">Log In</button>
			</Link>
        
			
		</div>
	);
};

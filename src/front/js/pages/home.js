import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		
		<div className="container m-0"> 
			<div className="text-center"> {/* Centra la imagen */}
				<img 
					className="img-fluid" 
					src="https://animalesde.net/wp-content/uploads/2016/12/los-animales-dom%C3%A9sticos.jpg" 
					alt="Banner" 
				/>
			</div>
			<div className="sección perros m-5">
				<h3>Productos top para perros</h3>
				<div className="row">
					<Card className="col-md-3" />
					<Card className="col-md-3" />
					<Card className="col-md-3" />
					<Card className="col-md-3" />
				</div>
			</div>

			<div className="sección gatos m-5">
				<h3>Productos top para gatos</h3>
				<div className="row">
					<Card className="col-md-3" />
					<Card className="col-md-3" />
					<Card className="col-md-3" />
					<Card className="col-md-3" />
				</div>
			</div>

			<div className="sección exóticos m-5">
				<h3>Productos top para animales exóticos</h3>
				<div className="row">
					<Card className="col-md-3" />
					<Card className="col-md-3" />
					<Card className="col-md-3" />
					<Card className="col-md-3" />
				</div>
			</div>
		</div>
	);
};

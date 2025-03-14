import React, { useContext, useEffect } from "react";
import logo from "/workspaces/PupperEatsAppreact-flask-hello-deprecated/src/front/img/perros-gatos-asomandose-sobre-banner-web-aislado-fondo-blanco-al-generado_866663-5304 (1) (1).jpg";
import { Context } from "../store/appContext";
import { Card } from "../component/card";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getDogFood();
		actions.getCatFood();
		actions.getExoticFood();
	}, []);

	return (
		<div className="container-fluid p-0" style={{ 
			background: "linear-gradient(to bottom, #FCE5CD, #FFFFFF)", 
			minHeight: "100vh", 
			paddingBottom: "50px" 
		}}>
			<div className="text-center mb-4" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}> 
				<img 
					src={logo} 
					alt="Banner" 
					style={{ maxHeight: "350px", width: "80%", objectFit: "cover" }} 
				/>
			</div>

			<div className="sección perros m-5 p-4 rounded" style={{ backgroundColor: "#FDF3E7", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
				<h3 className="text-primary border-bottom pb-2">Productos top para perros</h3>
				<div className="row">
					{store.dogFood.map((dogFood, index) => (
						<Card 
							name={dogFood.name} 
							category={"dogFood"} 
							id={dogFood.id} 
							description={dogFood.description}
							price={dogFood.price}
							url={dogFood.url}
							key={index}
						/>
					))}
				</div>
			</div>

			<div className="sección gatos m-5 p-4 rounded" style={{ backgroundColor: "#FAE0C3", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
				<h3 className="text-warning border-bottom pb-2">Productos top para gatos</h3>
				<div className="row">
					{store.catFood.map((catFood, index) => (
						<Card 
							name={catFood.name} 
							category={"catFood"} 
							id={catFood.id} 
							description={catFood.description}
							price={catFood.price}
							url={catFood.url}
							key={index}
						/>
					))}
				</div>
			</div>

			<div className="sección exóticos m-5 p-4 rounded" style={{ backgroundColor: "#E0F7E7", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
				<h3 className="text-success border-bottom pb-2">Productos top para animales exóticos</h3>
				<div className="row">
					{store.exoticFood.map((exoticFood, index) => (
						<Card 
							name={exoticFood.name} 
							category={"exoticFood"} 
							id={exoticFood.id} 
							description={exoticFood.description}
							price={exoticFood.price}
							url={exoticFood.url}
							key={index}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
import React, { Component } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";



export const Card = ({name, id, description, price, url}) => {

const { store, actions } = useContext(Context); 

return (

<div className="card m-2" style={{ width: "18rem" }}>
<Link to={`/vista-producto/${id}`} className="text-decoration-none">
  <img 
    src={url}
    style={{ width: "100px", height: "150px" }} 
    className="card-img-top mx-auto d-block mt-2" 
    alt="..." 
  />
  <div className="card-body text-center">
    <h5 className="card-title">{name}</h5>
    <p className="card-text">{description}</p>
    <h6 className="card-price">{price}€</h6>
  </div>
  </Link>
  <div className="mt-auto text-center">
 
  <Link className="btn btn-primary m-2" to="/loginSignup">
      Añadir carrito.
  </Link>
  </div>
</div>

);
}
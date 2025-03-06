import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext.js";

export const Pedidos = () => {
    const { store, actions } = useContext(Context)
    const [newOrder, setNewOrder] = useState("");
    const [orderList, setOrderList] = useState([]);

    return (
        <div className="container text-center text-light">
            <div className="">
                <h1 className="">Mis Pedidos</h1>
            </div>
            <div className="row justify-content-center p-4 border-bottom border-danger">
                <div className="col-md-5">
                    <img className="" src="https://m.media-amazon.com/images/I/913fRR9Dk5L._UF894,1000_QL80_.jpg" style={{ height: '350px', width: '400px' }} />
                </div>
                <div className="col-md-5 text-light fs-3">
                    <h2>Título: Imagine Dragons - Origins</h2>
                    <p>País: UK</p>
                    <p>Año: 2018 </p>
                    <p>Fecha de compra: 2-05-2018 </p>
                    <p>Numero de ID de compra: 2052018 </p>
                    <button type="button" className="btn btn-danger">Pop-Rock</button>
                </div>
            </div>
        </div>
    );
};
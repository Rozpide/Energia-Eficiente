import React from "react";

export const Card = () => {
    return (
        <div className="card mb-3 row">
            <div className="card-body d-flex justify-content-around col-8 align-items-center ">
                <h5 className="card-title ">Nombre Cuenta</h5>
                <div className="justify-content-center">
                    <div className="d-flex ">
                        <p className="card-text justify-content-around">Saldo</p>
                        <i class="bi bi-eye-fill"></i>
                        <i class="bi bi-eye-slash-fill"></i>
                    </div>
                    <p className="card-text ">Moneda</p>
                </div>
            </div>
            <div className="card-body d-flex justify-content-around col-2 align-items-center ">
                <a href="#" className="btn btn-primary  ">Button</a>
            </div>

        </div>
    )
}
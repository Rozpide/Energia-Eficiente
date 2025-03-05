import React from "react";

export const Card = (props) => {    
    return (
        
        <div className="card mb-3 row">
            <div className="card-body d-flex justify-content-around col-8 align-items-center ">
                <h5 className="card-title ">{props.name}</h5>
                <div className="justify-content-center">
                    <div className="d-flex ">
                        <p className="card-text justify-content-around">{props.balance}</p>
                        <i className="bi bi-eye-fill"></i>
                        <i className="bi bi-eye-slash-fill"></i>
                    </div>
                    <p className="card-text ">{props.coin}</p>
                </div>
            </div>
            <div className="card-body d-flex justify-content-around col-2 align-items-center ">
                <a href="#" className="btn btn-primary  ">Button</a>
            </div>
        </div>
    )
}
import React, { useContext, useEffect } from "react";
import { Sidebar } from "../component/sidebar";
import { Card } from "../component/card";
import "../../styles/container.css";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const PrincipalPage = () => {
    const { store, actions } = useContext(Context)
    let navigate = useNavigate();

    useEffect(() => {
        actions.verifyToken();
        actions.initializeStore()
        if (!store.auth) {
            navigate("/");
        }
    }, []);

    if (!store.auth){
        actions.logout()
        navigate("/");
    } 

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <h2>Balance general</h2>
                    <div className="scrollmenu">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        </div>
    );
}
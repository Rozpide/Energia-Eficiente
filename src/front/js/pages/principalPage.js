import React from "react";
import { Sidebar } from "../component/sidebar";
import { Card } from "../component/card";
import "../../styles/container.css";

export const PrincipalPage = () => {
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
    )
}
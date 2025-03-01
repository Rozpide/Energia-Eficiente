import React from "react";
import { Sidebar } from "../component/sidebar";
import { Card } from "../component/card";

export const PrincipalPage = () => {
    return (
        <>
            <div className="d-flex">
                <Sidebar />
                <div>
                    <Card/>
                </div>
            </div>
        </>
    )
}
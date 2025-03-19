import React from "react";
import ProveedorList from "../component/ProveedorList";
import ProveedorForm from "../component/ProveedorForm";

const ProveedorPage = () => {
    return (
        <div className="container mt-3">
            <h1>Gestión de Proveedores</h1>
            <ProveedorForm />
            <ProveedorList />
        </div>
    );
};

export default ProveedorPage;

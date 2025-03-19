import React, { useState, useEffect } from "react";

const ProveedorList = () => {
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/api/proveedores`,)
            .then(response => response.json())
            .then(data => setProveedores(data))
            .catch(error => console.error("Error al cargar proveedores:", error));
    }, []);

    return (
        <div>
            <h2>Lista de Proveedores</h2>
            <ul>
                {proveedores.map(proveedor => (
                    <li key={proveedor.id}>
                        {proveedor.nombre_proveedor} (Contacto: {proveedor.contacto})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProveedorList;

import React from "react";
import UserList from "../component/UserList";
import DashboardUsuario from "../component/DashboardUsuario";


const UserPage = () => {
    return (
        <div className="container mt-3">
            <h1>Gestión de Usuarios</h1>
            
            
            <UserList />
        </div>
    );
};

export default UserPage;

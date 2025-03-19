import React from "react";
import UserList from "../component/UserList";
import UserForm from "../component/UserForm";

const UserPage = () => {
    return (
        <div className="container mt-3">
            <h1>Gestión de Usuarios</h1>
            <UserForm />
            <UserList />
        </div>
    );
};

export default UserPage;

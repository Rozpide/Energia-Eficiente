import React, { useState, useEffect } from "react";

const UserList = () => {
    const [users, setUsers] = useState([]);

    // Cargar usuarios al inicio
    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/api/users`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error al cargar usuarios:", error));
    }, []);

    // Renderizar la lista de usuarios
    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;

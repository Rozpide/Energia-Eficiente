import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext'; // Asegúrate de importar el contexto de tu store
import { Link, useNavigate } from "react-router-dom";

const LogInAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actions, store } = useContext(Context); // Obtener acciones y store del contexto
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.logInAdmin(name, email, password); // Llamar a la acción logIn
        if (store.admin) {
            navigate("/");
    };
};
    

    return (
        <div className="container">
            <h1>Iniciar sesion ADMINISTRADOR</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /> <br />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /> <br />


                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> <br />
                <button className='btn btn-primary mt-3' type="submit">Iniciar Sesión</button>
                {store.message && <p>{store.message}</p>}
            </form>
        </div>
    );
};

export default LogInAdmin;
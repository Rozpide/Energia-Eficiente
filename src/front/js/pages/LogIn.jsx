import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext'; 
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actions, store } = useContext(Context); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.logIn(name, email, password);
        if (store.user && store.user.role) {
            if (store.user.role === 'admin') {
                navigate("/admin/dashboard"); // Redirige al dashboard de admin
            } else if (store.user.role === 'user') {
                navigate("/user/dashboard"); // Redirige al dashboard de usuario normal
            } else {
                navigate("/edituser"); // Redirige a la edición de usuario
            }
        } else {
            // Si no hay usuario o rol en el store, mostrar un error
            setError('No se pudo recuperar el rol del usuario');
        }
    };
    

    return ( 
        <div className='container'>
            <h1>Iniciar sesion User</h1>
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
                <button onClick={handleSubmit} className='btn btn-primary mt-3' type="submit">Iniciar Sesión</button>
                {store.message && <p>{store.message}</p>} 
             </form>
        </div>
    );
};

export default LogIn;
import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext'; 
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { actions, store } = useContext(Context); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.logIn(name, email, password);
        if (!success) {
            setError("Credenciales incorrectas");
        }
    };

    // Redirigir cuando el usuario esté en el store
    useEffect(() => {
        if (store.user && store.user.role) {
            if (store.user.role === 'admin') {
                navigate("/panel/admin");
            } else if (store.user.role === 'user') {
                navigate("/");
            } else {
                navigate("/logIn");
            }
        }
    }, [store.user, navigate]); // Se ejecuta cuando `store.user` cambia

    return ( 
        <div className='container'>
            <h1>Iniciar sesión</h1>
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
                {error && <p className="text-danger">{error}</p>} 
            </form>
        </div>
    );
};

export default LogIn;
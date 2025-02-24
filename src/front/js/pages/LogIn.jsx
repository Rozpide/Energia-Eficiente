import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext'; // Asegúrate de importar el contexto de tu store

const LogIn = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actions, store } = useContext(Context); // Obtener acciones y store del contexto

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.logIn(name, email, password); // Llamar a la acción logIn
    };
    

    return (
        <div>
            <h1>Hola</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
                {store.message && <p>{store.message}</p>}
            </form>
        </div>
    );
};

export default LogIn;
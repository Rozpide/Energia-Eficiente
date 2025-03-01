import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from "react-router-dom";

function AddDoctor() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [password, setPassword] = useState('');
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.AddDoctor(name, email, specialty, password);

        if (store.doctor) {
            navigate("/");
        }
    };

    return (
        <div className='container'>
            <h2>Registro de Doctores</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label><br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Specialty</label><br />
                    <input
                        type="text"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='btn btn-primary mt-3'>Registrar</button>
            </form>
        </div>
    );
}

export default AddDoctor;
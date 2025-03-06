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
            navigate("/logInDoc");
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
                

                <div className="input-group mb-3 mt-3">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Especialidad</button>
                    <ul className="dropdown-menu" aria-labelledby="specialtiesDropdown">
                        <li className="dropdown-item"> Medicina General</li>
                        <li className="dropdown-item"> Pediatría</li>
                        <li className="dropdown-item"> Ginecología y Obstetricia</li>
                        <li className="dropdown-item"> Cardiología</li>
                        <li className="dropdown-item"> Dermatología</li>
                        <li className="dropdown-item"> Ortopedia y Traumatología</li>
                        <li className="dropdown-item"> Neurología</li>
                        <li className="dropdown-item"> Oftalmología</li>
                        <li className="dropdown-item"> Otorrinolaringología</li>
                        <li className="dropdown-item"> Endocrinología</li>
                    </ul>

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
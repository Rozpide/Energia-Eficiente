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
                

                <div class="input-group mb-3 mt-3">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Especialidad</button>
                    <ul className="dropdown-menu" aria-labelledby="specialtiesDropdown">
                        <li><Link className="dropdown-item" to="/medicina-general">Medicina General</Link></li>
                        <li><Link className="dropdown-item" to="/pediatria">Pediatría</Link></li>
                        <li><Link className="dropdown-item" to="/ginecologia">Ginecología y Obstetricia</Link></li>
                        <li><Link className="dropdown-item" to="/cardiologia">Cardiología</Link></li>
                        <li><Link className="dropdown-item" to="/dermatologia">Dermatología</Link></li>
                        <li><Link className="dropdown-item" to="/ortopedia">Ortopedia y Traumatología</Link></li>
                        <li><Link className="dropdown-item" to="/neurologia">Neurología</Link></li>
                        <li><Link className="dropdown-item" to="/oftalmologia">Oftalmología</Link></li>
                        <li><Link className="dropdown-item" to="/otorrinolaringologia">Otorrinolaringología</Link></li>
                        <li><Link className="dropdown-item" to="/endocrinologia">Endocrinología</Link></li>
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
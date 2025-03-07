import React, { useState, useContext, } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const SignupForm = () => {
    const { actions } = useContext(Context);
    // definir nuevo estado para confirmar y debajo boton para volver al home. darle un nombre ale estado
    // const [itsOk, setItsOk] =useState(false)

    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        birthdate: "",
        country: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.registerUser(formData);
    };

    const handleOnclic = (e) => {
        navigate("/");

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="first_name" required value={formData.first_name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellidos</label>
                    <input type="text" className="form-control" name="last_name" required value={formData.last_name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de nacimiento</label>
                    <input type="date" className="form-control" name="birthdate" required value={formData.birthdate} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Pais</label>
                    <input type="country" className="form-control" name="country" required value={formData.country} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" required value={formData.password} onChange={handleChange} />
                </div>
                <div className="mb-3 mt-4">
                    <button type="submit" className="btn btn-primary w-100">Crear cuenta</button>
                    <hr />
                    <button type="button" className="btn btn-secondary w-100 mb-2" onClick={handleOnclic}>
                        Volver al inicio
                    </button>
                </div>
            </form>
        </div>

    );

};


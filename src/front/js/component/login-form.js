import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [invalidAccount, setInvalidAccount] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { store, actions } = useContext(Context)
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        await actions.login(email, password)
        if (!store.logged) {
            setInvalidAccount(true)
        } else {
            setInvalidAccount(false)
        }
    }
    useEffect(() => {
        if (store.logged) {
            navigate("/cuentas");
        }
        if (invalidAccount) {
            setInvalidAccount(false)
        }
    }, [store.logged])

    return (
        <form onSubmit={handleSubmit} className="mx-auto w-50">
            <div className="input-container">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="input-container">
                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
                {!invalidAccount ? <div id="emailHelp" className="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
                    : <div id="emailHelp" className="form-text invalidAccount">Correo o Contraseña incorrectos</div>}
            </div>
            <div className="buttons">
                <button type="submit" className="btn btn-primary login-user">INICIAR SESION</button>
                <hr className="hr-login"/>
                <p>¿Aun no estás registrado?</p>
                <button type="submit" className="btn btn-success create-user">Crear usuario</button>
            </div>
        </form>
    );
};
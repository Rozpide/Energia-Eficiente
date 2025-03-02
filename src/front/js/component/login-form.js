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
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} />
                {!invalidAccount ? <div id="emailHelp" className="form-text">Nunca compartiremos su correo electrónico con nadie más.</div>
                    : <div id="emailHelp" className="form-text invalidAccount">Correo o Contraseña errada</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};
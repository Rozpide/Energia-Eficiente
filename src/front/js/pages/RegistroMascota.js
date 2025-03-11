import React, { useState, useContext } from "react";
import "../../styles/registroMascota.css";
import { Context } from "../store/appContext";

export const RegistroMascota = () => {

    const { actions, store} = useContext (Context)

    const [nuevaMascota, setNuevaMascota] = useState({
        nombre: "",
        especie: "",
        tamaño: "",
        etapaVital: "",
        patologia: ""
    });

    const [fotoMascota, setFotoMascota] = useState(null);
    const token = store.token; // Definir token aquí??

    //setear datos mascota formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaMascota({
            ...nuevaMascota,
            [name]: value,
        });
    };

    //cargar foto formulario
    const handleFileChange = (e) => {
        setFotoMascota(e.target.files[0]);
    };

    //enviar al formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const datosMascota = new FormData(); 
        datosMascota.append("mascota", JSON.stringify(nuevaMascota));
        if (fotoMascota) {
            datosMascota.append("foto", fotoMascota);
        }
    
        console.log('Datos enviados:', nuevaMascota, fotoMascota);
    
        try {
            const response = await crearMascota(datosMascota);
            console.log('Respuesta de la API:', response);
        } catch (error) {
            console.error('Error al crear la mascota:', error);
        }
    };

    //Creación mascota
    const crearMascota = async (datosMascota) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: datosMascota,
            redirect: "follow"
        };
    
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/pets`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error; 
        }
    };
    

    return (
        <div className="container mt-5">
            <h2>Registro de Mascota</h2>
            <div className="d-flex">
                <form onSubmit={handleSubmit} className="flex-grow-1">
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre de la mascota</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            value={nuevaMascota.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="especie" className="form-label">Especie</label>
                        <select
                            className="form-select"
                            id="especie"
                            name="especie"
                            value={nuevaMascota.especie}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una especie</option>
                            <option value="perro">Canina</option>
                            <option value="gato">Felina</option>
                            <option value="exótico">Exótico</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tamaño" className="form-label">Tamaño</label>
                        <select
                            className="form-select"
                            id="tamaño"
                            name="tamaño"
                            value={nuevaMascota.tamaño}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="razaPequeña">Pequeño (0-10kg)</option>
                            <option value="razaMediana">Mediano (10-25kg)</option>
                            <option value="razaGrande">Grande (+25Kg)</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etapaVital" className="form-label">Etapa Vital</label>
                        <select
                            className="form-select"
                            id="etapaVital"
                            name="etapaVital"
                            value={nuevaMascota.etapaVital}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="cachorro">Cachorro (0-1 año)</option>
                            <option value="adulto">Adulto (1-7 años)</option>
                            <option value="senior">Senior (+7 años)</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="patologia" className="form-label">Patología</label>
                        <select
                            className="form-select"
                            id="patologia"
                            name="patologia"
                            value={nuevaMascota.patologia}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="diabetico">Diabetes</option>
                            <option value="renal">Insuficiencia renal</option>
                            <option value="urinarioStruvita">Urinario Struvita</option>
                            <option value="urinarioOxalatos">Urinario Oxalatos</option>
                            <option value="escorbuto">Escorbuto</option>
                            <option value="obesidad">Obesidad</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Registrar Mascota</button>
                </form>

                <div className="fotoMascota ms-4">
                    <h4>Sube una foto de tu compañero/a :</h4>
                    {fotoMascota && (
                        <div className="mt-2" style={{ width: "200px", height: "200px" }}>
                            <img src={URL.createObjectURL(fotoMascota)} alt="Vista previa" width="100%" />
                            <p>Archivo: {fotoMascota.name}</p>
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
                </div>
            </div>
        </div>
    );
};

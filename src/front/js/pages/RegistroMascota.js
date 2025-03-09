import React, { useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/registroMascota.css";

export const RegistroMascota = () => {
    const [nuevaMascota, setNuevaMascota] = useState({
        nombre: "",
        especie: "",
        tamaño: "",
        etapaVital: "",
        patología: ""
    });

    const [fotoMascota, setFotoMascota] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaMascota({
            ...nuevaMascota,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFotoMascota(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formMascota = new formMascota();
        formMascota.append("mascota", JSON.stringify(nuevaMascota));
        if (fotoMascota) {
            formMascota.append("foto", fotoMascota);
        }
        console.log('Datos enviados:', formData);
        // Aquí puedo enviar formData a la API o manejarlo según sea necesario
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
    }
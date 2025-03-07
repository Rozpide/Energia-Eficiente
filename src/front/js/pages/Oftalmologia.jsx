import React from "react";
import DoctorCard from "../component/DoctorCard.jsx";

const doctores = [
    { id: 1, name: "Doctor Ruben Magaña", especialidad: "Oftalmologo" },
    { id: 2, name: "Doctora Maria Daniela", especialidad: "Oftalmologo" },
];

const Oftalmologia = () => {
    return (
        <div>
            <h2>Oftalmologia</h2>
            <ul>
                {doctores.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </ul>
        </div>
    );
};

export default Oftalmologia;
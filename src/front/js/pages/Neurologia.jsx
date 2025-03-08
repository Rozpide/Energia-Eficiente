import React from "react";
import DoctorCard from "../component/DoctorCard.jsx";

const doctores = [
    { id: 1, name: "Doctor Juan Pérez", especialidad: "Neurologo" },
    { id: 2, name: "Doctora Ana Gómez", especialidad: "Neurologo" },
];

const Neurologia = () => {
    return (
        <div>
            <h2>Neurologia</h2>
            <ul>
                {doctores.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </ul>
        </div>
    );
};

export default Neurologia;
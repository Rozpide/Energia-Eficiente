import React from "react";
import DoctorCard from "../component/DoctorCard.jsx";

const doctores = [
    { id: 1, name: "Doctor Ernesto Pérez", especialidad: "Cardiologo" },
    { id: 2, name: "Doctora Patricia Pérez", especialidad: "Cardiologo" },
];

const Cardiologia = () => {
    return (
        <div>
            <h2>Cardiologia</h2>
            <ul>
                {doctores.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </ul>
        </div>
    );
};

export default Cardiologia;
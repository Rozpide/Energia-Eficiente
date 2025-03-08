import React from "react";
import DoctorCard from "../component/DoctorCard.jsx";

const doctores = [
    { id: 1, name: "Doctor Daniel Anderi", especialidad: "Ortopedista" },
    { id: 2, name: "Doctora Laura Cardozo", especialidad: "Ortopedista" },
];

const Ortopedia = () => {
    return (
        <div>
            <h2>Medicina General</h2>
            <ul>
                {doctores.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </ul>
        </div>
    );
};

export default Ortopedia;
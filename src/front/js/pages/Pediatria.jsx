import React from "react";
import DoctorCard from "../component/DoctorCard.jsx";

const doctores = [
    { id: 1, name: "Doctor Diego Vazquez", especialidad: "Pediatra" },
    { id: 2, name: "Doctora Yarely Martinez", especialidad: "Pediatra" },
];

const Pediatria = () => {
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

export default Pediatria;
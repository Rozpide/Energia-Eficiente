import React from "react";
import DoctorCard from "../component/DoctorCard.jsx";

const doctores = [
    { id: 1, name: "Doctor Jony Moesses", especialidad: "Dermatologo" },
    { id: 2, name: "Doctora Mariana Vázquez", especialidad: "Dermatologo" },
];

const Dermatologia = () => {
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

export default Dermatologia;
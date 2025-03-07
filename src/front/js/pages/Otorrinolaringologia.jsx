import React from "react";
import DoctorCard from "../component/DoctorCard.jsx";

const doctores = [
    { id: 1, name: "Doctor Itsban Rivero", especialidad: "Otorrino" },
    { id: 2, name: "Doctora Lupe Gomez", especialidad: "Otorrino" },
];

const Otorrinolaringologia = () => {
    return (
        <div>
            <h2>Otorrinolaringologia</h2>
            <ul>
                {doctores.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </ul>
        </div>
    );
};

export default Otorrinolaringologia;
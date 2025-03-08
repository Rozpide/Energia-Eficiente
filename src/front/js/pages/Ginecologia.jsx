import React from "react";
import DoctorCard from "../component/DoctorCard.jsx";

const doctores = [
    { id: 1, name: "Doctor David Cunha", especialidad: "Ginecologo" },
    { id: 2, name: "Doctora Dany Porras", especialidad: "Ginecologo" },
];

const Ginecologia = () => {
    return (
        <div>
            <h2>Ginecologia</h2>
            <ul>
                {doctores.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </ul>
        </div>
    );
};

export default Ginecologia;
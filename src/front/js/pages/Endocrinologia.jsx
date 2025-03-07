import React from "react";
import DoctorCard from "../component/DoctorCard.jsx";

const doctores = [
    { id: 1, name: "Gustavo Benitez", especialidad: "Endocrinologo" },
    { id: 2, name: "Doctora Ana Luna", especialidad: "Endocrinologo" },
];

const Endocrinología = () => {
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

export default Endocrinología;
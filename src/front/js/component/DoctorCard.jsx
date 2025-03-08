import React from "react";

const DoctorCard = ({ doctor }) => {
    return (
        <li style={{ 
            listStyleType: "none", 
            padding: "10px", 
            border: "1px solid #ddd", 
            borderRadius: "5px", 
            marginBottom: "10px" 
        }}>
            <h3>{doctor.name}</h3>
            <p>Especialidad: {doctor.especialidad}</p>
            <img 
                src={`https://via.placeholder.com/100?text=${doctor.name}`} 
                alt={doctor.name} 
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
        </li>
    );
};

export default DoctorCard;
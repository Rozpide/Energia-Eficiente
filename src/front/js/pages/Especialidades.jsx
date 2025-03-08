import React from 'react';
import { useParams } from 'react-router-dom';
import DoctorCard from '../component/DoctorCard.jsx';

const doctores = [
    { id: 1, name: 'Doctor 1', especialidad: 'Cardiología' },
    { id: 2, name: 'Doctor 2', especialidad: 'Dermatología' },
    { id: 3, name: 'Doctor 3', especialidad: 'Endocrinología' },
    { id: 4, name: 'Doctor 4', especialidad: 'Ginecología' },
    { id: 5, name: 'Doctor 5', especialidad: 'Medicina General' },
    { id: 6, name: 'Doctor 6', especialidad: 'Neurología' },
    { id: 7, name: 'Doctor 7', especialidad: 'Oftalmología' },
    { id: 8, name: 'Doctor 8', especialidad: 'Ortopedia' },
    { id: 9, name: 'Doctor 9', especialidad: 'Otorrinolaringología' },
    { id: 10, name: 'Doctor 10', especialidad: 'Pediatría' },
];

const EspecialidadView = () => {
    const { especialidad } = useParams();
    const doctoresFiltrados = doctores.filter(doc => doc.especialidad === especialidad);

    return (
        <div>
            <h2>{especialidad}</h2>
            {doctoresFiltrados.length > 0 ? (
                <ul>
                    {doctoresFiltrados.map(doctor => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </ul>
            ) : (
                <p>No hay doctores en esta especialidad.</p>
            )}
        </div>
    );
};

export default EspecialidadView;
import React, { useContext, useEffect } from "react";
import DoctorCard from "../component/DoctorCard.jsx";
import { Context } from '../store/appContext'
const doctores = [
    { id: 1, name: "Doctor Juan Pérez", especialidad: "Medicina General" },
    { id: 2, name: "Doctora Ana Gómez", especialidad: "Medicina General" },
];

const MedicinaGeneral = () => {
    const { store, actions } = useContext(Context);
    

    const doctor = async () => {
        try {
          await actions.doctorsGet() 
        } catch (error) {
          console.error(error);
        }
      }
    useEffect(()=>{doctor()
        
    },[])
    return (
        <div>
            <h2>Medicina General</h2>
            <ul>
                {doctores.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </ul>
            {/* <ul>
                {
                    store.doctor.map((item, index)=>{
                        return(<div key={index}>
                        <p>{item.name}</p>
                        <p>{item.email}</p>
                        <p>{item.specialty}</p>
                        </div>)
                    })
                }
            </ul> */}
              <ul>
            {store.doctor && store.doctor.map((item) => (
                <li key={item.id}>{item.name} - {item.email}-{item.specialty}</li>
            ))}
        </ul>
        </div>
    );
};

export default MedicinaGeneral;
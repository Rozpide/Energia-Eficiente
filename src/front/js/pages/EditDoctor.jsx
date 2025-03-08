import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'
const EditDoctor = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [docData, setDocData] = useState({
        name: store.doctor?.name || '',
        email: store.doctor?.email || '',
        password: store.doctor?.password || '',
    })




    const handleEdit = () => setIsEditing(!isEditing)

    const handleChange = (e) => {
        setDocData({ ...docData, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        try {

            await actions.editDoctor(docData, store.doctor?.id || localStorage.getItem('id'))
            setIsEditing(false)


        } catch (error) {
            console.error("No se edito correctamente", error)
        }
    }

    const deleteUs = async () => {
        const idDoc = store.doctor?.id || localStorage.getItem('id'); // Obtiene ID desde store o localStorage
        const confirmDelete = window.confirm("La cuenta se eliminara permanentemente estas seguro?")

        if (confirmDelete) {
            try {
                await actions.deleteDoctor(idDoc)
                navigate('/')
            } catch (error) {
                console.error("No se elimino Correctamente", error)

            }
        } else {
            console.log("Eliminacion de Cuenta Cancelada")

        }
    }

    useEffect(() => {
        if (store.doctor) {
            setDocData({
                name: store.doctor.name || '',
                email: store.doctor.email || '',
                password: store.doctor.password || ''
            });
        }
    }, [store.doctor]);

   let name = store.doctor?.name || localStorage.getItem('name');
   let email = store.doctor?.email || localStorage.getItem('email');


    return (
        <div>
            <i className="fa-solid fa-user"></i><h3>Mi Perfil</h3>
            {
                name ? (
                    <>
                        <p className='name'>
                            User: {isEditing ? <input type='text' name='name' value={docData.name} onChange={handleChange} /> : name}
                        </p>
                        <p className='email'>
                            Email: {isEditing ? <input type='email' name='email' value={docData.email} onChange={handleChange} /> : email}
                        </p>

                        {isEditing ? (
                            <>
                                <button onClick={handleSave}>Guardar</button>
                                <button onClick={handleEdit}>Cancelar</button>
                            </>

                        ) : (
                            <button className='btn btn-primary' onClick={handleEdit} type="submit">Edit User</button>


                        )}


                        <button className='btn btn-danger mx-5' onClick={deleteUs} type="submit">Delete User</button>     
                        <button className='btn btn-warning'  type="submit">Log Out</button>

                    </>) : (
                    <p>no funciono.......</p>
                )}
        </div>
    );
};

export default EditDoctor;
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom' 

const EditUser = () => {
  const { store, actions } = useContext(Context); 
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: store.user?.name || '',
    email: store.user?.email || '',
    password: store.user?.password || '',
  }) 
  console.log("El usuario es", store.user)




  const handleEdit = () => setIsEditing(!isEditing)

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {

      await actions.editUser(userData, store.user.id)
      setIsEditing(false)


    } catch (error) {
      console.error("No se edito correctamente", error)
    }
  }

  const deleteUs = async () => {
    const idUser = store.user?.id
    const confirmDelete = window.confirm("La cuenta se eliminara permanentemente estas seguro?")

    if (confirmDelete) {
      try {
        await actions.deleteUser(idUser)
      } catch (error) {
        console.error("No se elimino Correctamente", error)
      }
    } else {
      console.log("Eliminacion de Cuenta Cancelada")

    }
 }




  return (
    <div>
      <i class="fa-solid fa-user"></i><h3>Mi Perfil</h3>
      {
        store.user ? (
          <>
            <p className='name'>
              User: {isEditing ? <input type='text' name='name' value={userData.name} onChange={handleChange} /> : store.user.name}
            </p>
            <p className='email'>
              Email: {isEditing ? <input type='email' name='email' value={userData.email} onChange={handleChange} /> : store.user.email}
            </p>
            <p className='password'>
              Password: {isEditing ? <input type='password' name='password' value={userData.password} onChange={handleChange} /> : store.user.password}
            </p>
            {isEditing ? (
              <>
                <button onClick={handleSave}>Guardar</button>
                <button onClick={handleEdit}>Cancelar</button>
              </>

            ) : (
              <button className='btn btn-primary' onClick={handleEdit} type="submit">Edit User</button>


            )}


            <button className='btn btn-danger' onClick={deleteUs} type="submit">Delete User</button>
          </>) : (
          <p>no funciono.......</p>
        )}
    </div>
  )
}

export default EditUser
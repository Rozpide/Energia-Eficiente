import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'

const EditUser = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();



  const deleteUs = async () => { 
    const idUser=store.users?.id
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
  const editUs = async () => {
    try {
      await actions.editUser()
    } catch (error) {
      console.error("No se edit Correctamente", error)
    }
  }


  return (
    <div> 
     <i class="fa-solid fa-user"></i><h3>Mi Perfil</h3>
      {
        store.user ? ( 
          <> 
         <p className='name'>User: {store.user.name} </p>
         <p className='email'>Email:  {store.user.email}</p>
         <p className='password'>password:  {store.user.password}</p>
         
   
 

  <button onClick={()=>editUs()} type="submit">Edit User</button> 
  <button onClick={()=>deleteUs()} type="submit">Delete User</button>
       </> ):( 
        <p>no funciono.......</p>
       )}
    </div>
  )
}

export default EditUser
import React,{ useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { User, MapPin, PlusCircle } from "lucide-react";

export const PerfilUsuario =() => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getUser(); // Obtiene el usuario y sus mascotas
  }, []);

  if (!store.user) return <div className="text-center mt-10">Cargando...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="text-gray-500" />
          </div>
          <input placeholder="Buscar..." className="w-64 p-2 border rounded-md" />
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded-md">Carrito</button>
          <button className="text-red-500" onClick={actions.logout}>Cerrar sesión</button>
        </div>
      </div>

      {/* Perfil de Usuario */}
      <div className="p-4 border rounded-md bg-white">
        <h2 className="text-xl font-semibold">Hola <span className="text-blue-600">@{store.user.name}</span></h2>
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2"><User size={16} /> {store.user.name}</div>
          <div className="flex items-center gap-2"><MapPin size={16} /> {store.user.email}</div>
          <button className="text-blue-500">Editar perfil</button>
        </div>
      </div>

      {/* Mis Mascotas */}
      <h3 className="text-lg font-semibold mt-6">Mis mascotas</h3>
      <div className="p-4 border rounded-md bg-white mt-2 flex gap-6 flex-wrap">
        <button className="flex flex-col items-center text-gray-500">
          <PlusCircle size={40} className="text-gray-400" />
          <span className="text-sm">Añadir perfil mascota</span>
        </button>
        {store.pets && store.pets.length > 0 ? (
          store.pets.map((pet, index) => (
            <div key={index} className="flex flex-col items-center p-4 border rounded-md bg-gray-50 shadow-md">
              <img 
                src={pet.url || "https://via.placeholder.com/100"} 
                alt={pet.name} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className="text-sm mt-1 font-semibold">{pet.name}</span>
              <span className="text-xs text-gray-500">{pet.breed || pet.animal_type}</span>
              <span className="text-xs text-gray-500">{pet.age} años</span>
              <span className="text-xs text-gray-500">{pet.size}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tienes mascotas registradas</p>
        )}
      </div>
    </div>
  );
}

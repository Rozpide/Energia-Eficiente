

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const [formProveedor, setFormProveedor] = useState({ email: "", password: "" });
  const [formUsuario, setFormUsuario] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [proveedorId, setProveedorId] = useState(null); // ID del proveedor autenticado
  const [error, setError] = useState(null);
  const [role, setRole] = useState("none"); // Estado para elegir entre Proveedor y Usuario

  const navigate = useNavigate();

  // Maneja cambios en el formulario del proveedor
  const handleChangeProveedor = (event) => {
    const { name, value } = event.target;
    setFormProveedor({ ...formProveedor, [name]: value });
  };

  // Maneja cambios en el formulario del usuario
  const handleChangeUsuario = (event) => {
    const { name, value } = event.target;
    setFormUsuario({ ...formUsuario, [name]: value });
  };

  // Maneja el envío del formulario del proveedor
  const handleSubmitProveedor = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/proveedores/autenticar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formProveedor),
        }
      );

      if (!response.ok) {
        throw new Error("Autenticación fallida. Verifica tus credenciales.");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.token); // Guarda el token en localStorage
      setProveedorId(data.proveedorId); // Guarda el ID del proveedor autenticado
      setIsAuthenticated(true); // Cambia el estado de autenticación
      alert("Inicio de sesión exitoso.");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  // Maneja el envío del formulario del usuario
  const handleSubmitUsuario = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/users/autenticar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formUsuario),
        }
      );

      if (!response.ok) {
        throw new Error("Autenticación fallida. Verifica tus credenciales.");
      }

      const data = await response.json();
      localStorage.setItem("user_token", data.token); // Guarda el token en localStorage
      setIsAuthenticated(true); // Cambia el estado de autenticación
      alert("Inicio de sesión exitoso.");
      navigate("/comparar-tarifas"); // Redirige al comparador de tarifas
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  // Maneja el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Elimina el token del almacenamiento local
    localStorage.removeItem("user_token"); // Elimina el token de usuario
    setProveedorId(null); // Resetea el ID del proveedor
    setIsAuthenticated(false); // Cambia el estado de autenticación
    alert("Sesión cerrada.");
  };

  // Redirige a la página de tarifas
  const manejarVerTarifas = () => {
    if (proveedorId) {
      navigate(`/tarifas/${proveedorId}`); // Redirige a la página de tarifas
    } else {
      alert("El ID del proveedor no está disponible o es inválido.");
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Bienvenido a la Plataforma</h1>
      
      {role === "none" && (
        <>
          <h3>Selecciona tu perfil para iniciar sesión</h3>
          <button
            onClick={() => setRole("proveedor")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Soy Proveedor
          </button>
          <button
            onClick={() => setRole("usuario")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Soy Usuario
          </button>
        </>
      )}

      
      {role === "proveedor" && !isAuthenticated && (
        <>
          <form onSubmit={handleSubmitProveedor} style={{ marginBottom: "20px" }}>
            <h3>Iniciar Sesión - Proveedor</h3>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formProveedor.email}
              onChange={handleChangeProveedor}
              required
              style={{
                marginRight: "10px",
                padding: "0.5rem",
                width: "300px",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formProveedor.password}
              onChange={handleChangeProveedor}
              required
              style={{
                marginRight: "10px",
                padding: "0.5rem",
                width: "300px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Iniciar Sesión
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}

      
      {role === "usuario" && !isAuthenticated && (
        <>
          <form onSubmit={handleSubmitUsuario} style={{ marginBottom: "20px" }}>
            <h3>Iniciar Sesión - Usuario</h3>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formUsuario.email}
              onChange={handleChangeUsuario}
              required
              style={{
                marginRight: "10px",
                padding: "0.5rem",
                width: "300px",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formUsuario.password}
              onChange={handleChangeUsuario}
              required
              style={{
                marginRight: "10px",
                padding: "0.5rem",
                width: "300px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Iniciar Sesión
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}

      
      {isAuthenticated && role === "proveedor" && (
        <>
          <h3>Bienvenido, proveedor</h3>
          <button
            onClick={() => manejarVerTarifas(proveedorId)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "aquamarine",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Ver Tarifas
          </button>
        </>
      )}
      {isAuthenticated && role === "usuario" && (
        <>
          <h3>Bienvenido, usuario</h3>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              padding: "0.5rem 1rem",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cerrar Sesión
          </button>
        </>
      )}
    </div>
  );
};

/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { Navbar } from "../component/navbar"; // Importa el Navbar dinámico

export const Home = () => {
  const [formProveedor, setFormProveedor] = useState({ email: "", password: "" });
  const [formUsuario, setFormUsuario] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [proveedorId, setProveedorId] = useState(null); // ID del proveedor autenticado
  const [error, setError] = useState(null);
  const [role, setRole] = useState("none"); // Estado para elegir entre Proveedor y Usuario

  const navigate = useNavigate();

  // Maneja cambios en el formulario del proveedor
  const handleChangeProveedor = (event) => {
    const { name, value } = event.target;
    setFormProveedor({ ...formProveedor, [name]: value });
  };

  // Maneja cambios en el formulario del usuario
  const handleChangeUsuario = (event) => {
    const { name, value } = event.target;
    setFormUsuario({ ...formUsuario, [name]: value });
  };

  // Maneja el envío del formulario del proveedor
  const handleSubmitProveedor = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/proveedores/autenticar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formProveedor),
        }
      );

      if (!response.ok) {
        throw new Error("Autenticación fallida. Verifica tus credenciales.");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.token); // Guarda el token en localStorage
      setProveedorId(data.proveedorId); // Guarda el ID del proveedor autenticado
      setIsAuthenticated(true); // Cambia el estado de autenticación
      setRole("proveedor"); // Establece el rol como proveedor
      alert("Inicio de sesión exitoso.");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  // Maneja el envío del formulario del usuario
  const handleSubmitUsuario = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/users/autenticar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formUsuario),
        }
      );

      if (!response.ok) {
        throw new Error("Autenticación fallida. Verifica tus credenciales.");
      }

      const data = await response.json();
      localStorage.setItem("user_token", data.token); // Guarda el token en localStorage
      setIsAuthenticated(true); // Cambia el estado de autenticación
      setRole("usuario"); // Establece el rol como usuario
      alert("Inicio de sesión exitoso.");
      navigate("/comparar-tarifas"); // Redirige al comparador de tarifas
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  // Maneja el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Elimina el token del almacenamiento local
    localStorage.removeItem("user_token"); // Elimina el token de usuario
    setProveedorId(null); // Resetea el ID del proveedor
    setIsAuthenticated(false); // Cambia el estado de autenticación
    setRole("none"); // Reinicia el rol
    alert("Sesión cerrada.");
  };

  // Redirige a la página de tarifas
  const manejarVerTarifas = () => {
    if (proveedorId) {
      navigate(`/tarifas/${proveedorId}`); // Redirige a la página de tarifas
    } else {
      alert("El ID del proveedor no está disponible o es inválido.");
    }
  };

  return (
    <div className="text-center mt-5">
      
      <Navbar rol={isAuthenticated ? role : null} cerrarSesion={handleLogout} />

      <h1>Bienvenido a la Plataforma</h1>

      
      {role === "none" && (
        <>
          <h3>Selecciona tu perfil1111111111111 para iniciar sesión</h3>
          <button
            onClick={() => setRole("proveedor")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Login Proveedor
          </button>
          <button
            onClick={() => setRole("usuario")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login Usuario
          </button>
        </>
      )}

      
      {role === "proveedor" && !isAuthenticated && (
        <>
          <form onSubmit={handleSubmitProveedor} style={{ marginBottom: "20px" }}>
            <h3>Iniciar Sesión - Proveedor</h3>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formProveedor.email}
              onChange={handleChangeProveedor}
              required
              style={{
                marginRight: "10px",
                padding: "0.5rem",
                width: "300px",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formProveedor.password}
              onChange={handleChangeProveedor}
              required
              style={{
                marginRight: "10px",
                padding: "0.5rem",
                width: "300px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Iniciar Sesión
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}

      
      {role === "usuario" && !isAuthenticated && (
        <>
          <form onSubmit={handleSubmitUsuario} style={{ marginBottom: "20px" }}>
            <h3>Iniciar Sesión - Usuario</h3>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formUsuario.email}
              onChange={handleChangeUsuario}
              required
              style={{
                marginRight: "10px",
                padding: "0.5rem",
                width: "300px",
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formUsuario.password}
              onChange={handleChangeUsuario}
              required
              style={{
                marginRight: "10px",
                padding: "0.5rem",
                width: "300px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Iniciar Sesión
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}

      
      {isAuthenticated && role === "proveedor" && (
        <>
          <h3>Bienvenido, proveedor</h3>
          <button
            onClick={manejarVerTarifas}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "aquamarine",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Ver Tarifas
          </button>
        </>
      )}
      {isAuthenticated && role === "usuario" && (
        <>
          <h3>Bienvenido, usuario</h3>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              padding: "0.5rem 1rem",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cerrar Sesión
          </button>
        </>
      )}
    </div>
  );
}
 */
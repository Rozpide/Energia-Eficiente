
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import MusicPlayer from "../component/MusicPlayer"; // Importa el componente MusicPlayer

export const Home = () => {
  const [formProveedor, setFormProveedor] = useState({
    email: "",
    password: "",
  });
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
  const getEnergyAdvice = async (userId) => {
    try {
        const response = await fetch("https://glorious-space-dollop-q56qvjrjqw4cvw6-3001.app.github.dev/api/energy-advice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              userId: "12345",
              energyType: "renewable",
              budget: 100,}),
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const data = await response.json();

        // ✅ Verificación para evitar estructuras anidadas incorrectas
        if (typeof data.advice === "object" && data.advice.advice) {
            console.warn("⚠️ Se detectó un posible anidamiento de `advice`. Ajustando...");
            return data.advice.advice;  // ✅ Extrae la respuesta correcta
        }

        return data.advice; // ✅ Retorno limpio y correcto

    } catch (error) {
        console.error("🚨 Error en getEnergyAdvice:", error.message);
        return "No se pudo obtener la recomendación.";  // ✅ Retorno seguro en caso de error
    }
};

  const handleGetAdvice = async () => {
    const response = await getEnergyAdvice(1);
    const advice = response; // ✅ Extrae el contenido correcto
    console.log("Recomendación energética:", advice);
  };

  return (
    <div className="text-center mt-5">
      <button
        onClick={handleGetAdvice}
        style={{
          marginTop: "20px",
          padding: "0.5rem 1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Obtener Recomendación Energética
      </button>

      {role === "none" && (
        <>
          <h1>registrado</h1>
          <h3> inicia sesión</h3>
          <button
            style={{
              backgroundColor: "#ff9999",
              color: "white",
              bordercolor: "black",
              border: "2px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => setRole("usuario")}
            className="button-usuario"
          >
            Cliente
          </button>
          <button
            onClick={() => setRole("proveedor")}
            className="button-proveedor"
            style={{
              marginLeft: "10px",
              backgroundColor: "#ff9999",
              color: "white",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Proveedor
          </button>
        </>
      )}

      {role === "proveedor" && !isAuthenticated && (
        <>
          <form
            onSubmit={handleSubmitProveedor}
            style={{ marginBottom: "20px" }}
          >
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
              className="button-proveedor"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#ff9999",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Inicia Sesión
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}

      {role === "usuario" && !isAuthenticated && (
        <>
          <form onSubmit={handleSubmitUsuario} style={{ marginBottom: "20px" }}>
            <h3>Iniciar Sesión - Cliente</h3>
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
              className="button-proveedor"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#ff9999",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Inicia Sesión
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
              backgroundColor: "#ff9999",
              color: "white",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Accede a tus Tarifas
          </button>
          <MusicPlayer />
        </>
      )}
      {isAuthenticated && role === "usuario" && (
        <>
          <h3>Bienvenido cliente</h3>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              padding: "0.5rem 1rem",
              backgroundColor: "#ff9999",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cerrar Sesión
          </button>
          <MusicPlayer />
        </>
      )}
    </div>
  );
};
export default Home;

/*
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import MusicPlayer from "../component/MusicPlayer"; // Importa el componente MusicPlayer

export const Home = () => {
  const [formProveedor, setFormProveedor] = useState({
    email: "",
    password: "",
  });
  const [formUsuario, setFormUsuario] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [proveedorId, setProveedorId] = useState(null); // ID del proveedor autenticado
  const [error, setError] = useState(null);
  const [role, setRole] = useState("none"); // Estado para elegir entre Proveedor y Usuario

  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
  const [formData, setFormData] = useState({
    consumption: "",
    peak_hours: false,
  });

  const navigate = useNavigate();

  // Define getEnergyAdvice para que esté disponible
  const getEnergyAdvice = async (userId) => {
    try {
      const response = await fetch(
        "https://glorious-space-dollop-q56qvjrjqw4cvw6-3001.app.github.dev/api/energy-advice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "12345",
            energyType: "renewable",
            budget: 100,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      const data = await response.json();
      return data.advice; // Devuelve directamente la recomendación
    } catch (error) {
      console.error("🚨 Error en getEnergyAdvice:", error.message);
      return "No se pudo obtener la recomendación."; // Retorno seguro en caso de error
    }
  };

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

  // Maneja cambios en el formulario de consumo energético
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validación de datos de consumo al iniciar sesión
  useEffect(() => {
    let isMounted = true; // ✅ Variable para verificar si el componente está montado

    const checkConsumptionData = async () => {
      if (!isAuthenticated) return; // ✅ Ejecuta solo si el usuario está autenticado
      try {
        const response = await fetch(
          `https://glorious-space-dollop-q56qvjrjqw4cvw6-3001.app.github.dev/api/validate-consumption?userId=12345`
        );
        const data = await response.json();

        if (isMounted) {
          if (!data.hasData) {
            setShowForm(true); // ✅ Muestra el formulario si no hay datos
          } else {
            setShowForm(false); // ✅ Oculta el formulario si ya existen datos
          }
        }
      } catch (error) {
        console.error("Error al validar datos de consumo:", error);
      }
    };

    checkConsumptionData();

    // ✅ Limpieza para evitar actualizaciones de estado en componentes desmontados
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

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

  // Guardar los datos del formulario de consumo energético
  const handleSubmitConsumption = async () => {
    try {
      const response = await fetch(
        "https://glorious-space-dollop-q56qvjrjqw4cvw6-3001.app.github.dev/api/add-consumption",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: "12345",
            consumption: formData.consumption,
            peak_hours: formData.peak_hours,
            date: new Date().toISOString(),
          }),
        }
      );
      if (!response.ok) throw new Error("Error al guardar los datos");
      alert("Datos guardados exitosamente");
      setShowForm(false); // Oculta el formulario después de guardar
    } catch (error) {
      console.error("Error al guardar los datos:", error);
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

  const handleGetAdvice = async () => {
    const advice = await getEnergyAdvice(1); // Usa la función definida
    console.log("Recomendación energética:", advice);
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Selecciona un archivo válido.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://glorious-space-dollop-q56qvjrjqw4cvw6-3001.app.github.dev/api/upload-file",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al procesar el archivo.");
      }

      const result = await response.json();
      alert("Archivo procesado exitosamente.");
      console.log("Datos procesados:", result);
    } catch (error) {
      console.error("Error al procesar archivo:", error);
    }
  };

  return (
    <div className="text-center mt-5">
      {role === "none" && (
        <>
          <h1>registrado</h1>
          <h3> inicia sesión</h3>
          <button
            style={{
              backgroundColor: "#ff9999",
              color: "white",
              bordercolor: "black",
              border: "2px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={() => setRole("usuario")}
            className="button-usuario"
          >
            Cliente
          </button>
          <button
            onClick={() => setRole("proveedor")}
            className="button-proveedor"
            style={{
              marginLeft: "10px",
              backgroundColor: "#ff9999",
              color: "white",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Proveedor
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
              className="button-proveedor"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#ff9999",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Inicia Sesión
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
  
      {role === "usuario" && !isAuthenticated && (
        <>
          <form onSubmit={handleSubmitUsuario} style={{ marginBottom: "20px" }}>
            <h3>Iniciar Sesión - Cliente</h3>
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
              className="button-proveedor"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#ff9999",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Inicia Sesión
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
              backgroundColor: "#ff9999",
              color: "white",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Accede a tus Tarifas
          </button>
          <MusicPlayer />
        </>
      )}
  
      {isAuthenticated && role === "usuario" && (
        <>
          <h3>Bienvenido cliente</h3>
  
          
  
          
          <div>
            <h2>Cargar datos de consumo</h2>
            <input
              type="file"
              accept=".csv, .docx"
              onChange={handleFileUpload}
              style={{
                marginTop: "10px",
                padding: "0.5rem",
                cursor: "pointer",
              }}
            />
          </div>
  
          <MusicPlayer />
          
          <button
            onClick={handleGetAdvice}
            style={{
              marginTop: "20px",
              padding: "0.5rem 1rem",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Obtener Recomendación Energética
          </button>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              padding: "0.5rem 1rem",
              backgroundColor: "#ff9999",
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
export default Home;
*/
import React, { useState } from "react";
import TarifaElectricaList from "../component/TarifaElectricaList";

const TarifaPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para control de acceso
  const [proveedorId, setProveedorId] = useState(""); // Almacena el ID del proveedor autenticado
  const [showLoginModal, setShowLoginModal] = useState(false); // Estado para mostrar el modal
  const [authForm, setAuthForm] = useState({
    email: "", // Campo para correo electrónico
    password: "", // Campo para la contraseña
  });

  // Maneja cambios en el formulario de autenticación
  const handleAuthChange = (event) => {
    const { name, value } = event.target;
    setAuthForm((prevAuthForm) => ({
      ...prevAuthForm, // Mantiene valores anteriores
      [name]: value, // Actualiza solo el campo que corresponde
    }));
  };

  // Maneja el inicio de sesión
  const handleLogin = (event) => {
    event.preventDefault();

    fetch(`${process.env.BACKEND_URL}/api/login_proveedor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authForm), // Enviar datos del formulario
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la autenticación: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Inicio de sesión exitoso:", data);
        setProveedorId(authForm.email); // Almacenar el correo del proveedor autenticado
        setIsAuthenticated(true); // Cambiar el estado de autenticación
        setShowLoginModal(false); // Cerrar el modal de inicio de sesión
        alert("Bienvenido al sistema.");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        alert("Credenciales inválidas o problemas en el servidor.");
      });
  };

  // Maneja el cierre de sesión
  const handleLogout = () => {
    setProveedorId(""); // Limpiar ID del proveedor
    setIsAuthenticated(false); // Cerrar sesión
    alert("Sesión cerrada.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Gestión de Tarifas Eléctricas
      </h1>

      {/* Login y Logout */}
      {!isAuthenticated ? (
        <>
          {/* Botón para mostrar modal de login */}
          <button
            onClick={() => setShowLoginModal(true)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Acceso Proveedores
          </button>
        </>
      ) : (
        <>
          <p>
            Bienvenido, proveedor <strong>{proveedorId}</strong>
          </p>
          <button
            onClick={handleLogout}
            style={{
              marginBottom: "20px",
              padding: "0.5rem 1rem",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </>
      )}

      {/* Modal de login */}
      {showLoginModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>Iniciar sesión - Acceso Proveedores</h3>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={authForm.email}
                onChange={handleAuthChange}
                required
                style={{
                  marginBottom: "10px",
                  padding: "0.5rem",
                  width: "100%",
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={authForm.password}
                onChange={handleAuthChange}
                required
                style={{
                  marginBottom: "10px",
                  padding: "0.5rem",
                  width: "100%",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Listado de tarifas */}
      {isAuthenticated && (
        <TarifaElectricaList proveedorId={proveedorId} />
      )}
    </div>
  );
};

export default TarifaPage;

// Estilos del modal
const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
};

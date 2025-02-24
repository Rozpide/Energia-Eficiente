import React, { useState } from "react";
import "../../styles/login.css";
import microphone from "../../img/microphone.jpg";

export const Login = () => {
  // Estado para determinar si mostramos el formulario de login o registro
  const [showLogin, setShowLogin] = useState(false);

  // Función para mostrar el formulario de login
  const showLoginForm = () => setShowLogin(true);

  // Función para mostrar el formulario de registro
  const showRegisterForm = () => setShowLogin(false);

  return (
    <div
      style={{
        backgroundImage: `url(${microphone})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        className="login-container p-4 shadow-lg rounded-3 w-100"
        style={{ maxWidth: "400px", background: "rgba(255, 255, 255, 0.5)" }}
      >
        {!showLogin ? (
          // Pantalla inicial con los botones
          <div>
            <h2 className="text-center mb-4">Bienvenido</h2>
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={showLoginForm}
            >
              Iniciar sesión
            </button>
            <button
              className="btn btn-secondary w-100"
              onClick={showRegisterForm}
            >
              Registrarse
            </button>
          </div>
        ) : (
          // Formulario de login
          <form>
            <h2 className="text-center mb-4">Iniciar sesión</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nombre de usuario"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Contraseña"
                required
              />
            </div>
            <button type="submit" className="btn btn-danger w-100 py-2">
              Ingresar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

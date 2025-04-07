
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import logo from "/src/front/img/logo_energia_eficiente.png"; // Importar la imagen del logo
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import {Link} from "react-router-dom";
import UserPage from "./pages/UserPage"; // Página de usuarios
import ProveedorPage from "./pages/ProveedorPage"; // Página de proveedores
import TarifaPage from "./pages/TarifaPage"; // Página de tarifas
import injectContext from "./store/appContext";
import ProveedorList from "./component/ProveedorList";
import TarifaElectricaList from "./component/TarifaElectricaList";
import ProveedorDashboard from "./pages/ProveedorDashboard";
import DashboardForm from "./component/DashboardForm";
import LoginProveedor from "./component/LoginProveedor";
import CompararTarifas from "./component/CompararTarifas"; // Importar el componente
//import UserLogin from "./components/UserLogin"; // Formulario de usuario
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  // Estado para manejar el rol seleccionado
  const [rol, setRol] = useState(null);

  // Función para establecer el rol
  const seleccionarRol = (nuevoRol) => {
    setRol(nuevoRol); // Define el rol como "Usuario" o "Proveedor"
  };

  // Función para manejar el cierre de sesión
  const cerrarSesion = () => {
    setRol(null); // Restablece el estado inicial
    localStorage.removeItem("access_token"); // Borra el token si es necesario
    alert("Sesión cerrada correctamente."); // Mensaje opcional
  };

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
    return <BackendURL />;
  }

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          {/* Navbar dinámico basado en el rol */}
          <Navbar rol={rol} cerrarSesion={cerrarSesion} />
          
          {/* Contenido Principal */}
          <div className="container mt-4">
            {/* Opciones iniciales si no hay rol */}
            {!rol && (
              <div className="text-center">
                <div className="logo-container">
                  {/* Logo */}
                  <Link to="/">
                    <img
                      src={logo}
                      alt="Logo"
                      className="img-fluid"
                      style={{ maxWidth: "70px", marginBottom: "20px", borderRadius: "30%" }}
                    />
                  </Link>
                </div>
                <h1>Plataforma de Gestión Energética</h1>
                <p className="deslizar">Selecciona tu rol, cliente o proveedor para continuar:</p>
                <button
                  
                  onClick={() => seleccionarRol("Usuario")}
                >
                  Alta Cliente
                </button>
                <button
                  
                  onClick={() => seleccionarRol("Proveedor")}
                >
                  Alta Proveedor
                </button>
              </div>
            )}

            {/* Rutas de la aplicación */}
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Demo />} path="/demo" />
              <Route element={<Single />} path="/single/:theid" />
              <Route element={<DashboardForm />} path="/" />
              <Route element={<TarifaPage />} path="/tarifas" />
              <Route element={<ProveedorList />} path="/proveedores" />
              <Route
                element={<TarifaElectricaList />}
                path="/tarifas-electricas"
              />
              <Route element={<UserPage />} path="/users" />
              <Route element={<CompararTarifas />} path="/comparar-tarifas" />
              <Route element={<ProveedorPage />} path="/proveedores" />
              <Route element={<TarifaPage />} path="/tarifas/:proveedorId" />
              <Route
                element={<ProveedorDashboard />}
                path="/proveedor/dashboard/"
              />
              <Route element={<LoginProveedor />} path="/login" />
              <Route element={<h1>Not found!</h1>} />
            </Routes>
          </div>

          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);

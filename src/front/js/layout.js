import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MusicPlayer from "./component/MusicPlayer";

import ScrollToTop from "./component/scrollToTop"; // Para volver arriba al navegar
import { BackendURL } from "./component/backendURL";
import logo from "/src/front/img/logo_energia_eficiente.png"; // Imagen del logo
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Link } from "react-router-dom";
import UserPage from "./pages/UserPage"; // Página de usuarios
import ProveedorPage from "./pages/ProveedorPage"; // Página de proveedores
import TarifaPage from "./pages/TarifaPage"; // Página de tarifas
import injectContext from "./store/appContext";
import ProveedorList from "./component/ProveedorList";
import TarifaElectricaList from "./component/TarifaElectricaList";
import ProveedorDashboard from "./pages/ProveedorDashboard";
import DashboardForm from "./component/DashboardForm";
import LoginProveedor from "./component/LoginProveedor";
import CompararTarifas from "./component/CompararTarifas"; // Comparar tarifas
import { Navbar } from "./component/navbar"; // Barra de navegación
import { Footer } from "./component/footer"; // Pie de página

const Layout = () => {
  const basename = process.env.BASENAME || "";

  // Estado para manejar el rol seleccionado (Usuario o Proveedor)
  const [rol, setRol] = useState(null);

  // Función para establecer el rol
  const seleccionarRol = (nuevoRol) => {
    setRol(nuevoRol);
  };

  // Función para manejar el cierre de sesión
  const cerrarSesion = () => {
    setRol(null);
    localStorage.removeItem("access_token"); // Borra cualquier token almacenado
    alert("Sesión cerrada correctamente.");
  };

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
    return <BackendURL />; // Si no hay URL de backend definida
  }

  return (
    <div>
      <BrowserRouter basename={basename}>
         
        <ScrollToTop>
          {/* Barra de navegación dinámica dependiendo del rol */}
          <Navbar rol={rol} cerrarSesion={cerrarSesion} />
          <MusicPlayer />
          <div className="container mt-4">
            
            

            {/* Opciones iniciales si no hay un rol seleccionado */}
            {!rol && (
              <div className="text-center">
                <div className="logo-container">
                  <Link to="/">
                    <img
                      src={logo}
                      alt="Logo"
                      className="img-fluid"
                      style={{
                        maxWidth: "70px",
                        marginBottom: "20px",
                        borderRadius: "30%",
                      }}
                    />
                  </Link>
                </div>
                <h1>Plataforma de Gestión Energética</h1>
                <p className="deslizar">
                  Selecciona tu rol, cliente o proveedor para continuar:
                </p>
                <button
                  onClick={() => seleccionarRol("Usuario")}
                  style={{
                    margin: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Alta Cliente
                </button>
                <button
                  onClick={() => seleccionarRol("Proveedor")}
                  style={{
                    margin: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Alta Proveedor
                </button>
              </div>
            )}

            {/* Rutas principales de la aplicación */}
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Demo />} path="/demo" />
              <Route element={<Single />} path="/single/:theid" />
              <Route element={<DashboardForm />} path="/" />
              <Route element={<TarifaPage />} path="/tarifas" />
              <Route element={<ProveedorList />} path="/proveedores" />
              <Route element={<TarifaElectricaList />} path="/tarifas-electricas" />
              <Route element={<UserPage />} path="/users" />
              <Route element={<CompararTarifas />} path="/comparar-tarifas" />
              <Route element={<ProveedorPage />} path="/proveedores" />
              <Route element={<TarifaPage />} path="/tarifas/:proveedorId" />
              <Route element={<ProveedorDashboard />} path="/proveedor/dashboard/" />
              <Route element={<LoginProveedor />} path="/login" />
              <Route element={<h1>404 - Página no encontrada</h1>} path="*" />
            </Routes>
          </div>

          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);

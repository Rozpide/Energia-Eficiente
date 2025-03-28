import React from "react";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
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

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar /> {/* Menú de navegación */}
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            {/* Nuevas rutas */}
            <Route element={<DashboardForm />} path="/" />
            <Route element={<TarifaPage />} path="/tarifas" />
            <Route element={<ProveedorList />} path="/proveedores" />
            <Route
              element={<TarifaElectricaList />}
              path="/tarifas-electricas"
            />
            <Route element={<UserPage />} path="/users" />
            {/* Ruta de login de usuario */}
           {/* <Route path="/login/users" element={<UserLogin />} />*/}

            {/* Ruta para comparar tarifas */}
            <Route element={<CompararTarifas />} path="/comparar-tarifas"  />
            <Route element={<ProveedorPage />} path="/proveedores" />
            <Route element={<TarifaPage />} path="/tarifas/:proveedorId" />
            <Route
              element={<ProveedorDashboard />}
              path="/proveedor/dashboard/"
            />
            <Route element={<LoginProveedor />} path="/login" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);

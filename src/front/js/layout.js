import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { PerfilUsuario} from "./pages/perfilUsuario";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { VistaMascota } from "./pages/vistaMascota";
import { VistaProducto } from "./pages/VistaProducto";

import { LoginSignup } from "./pages/loginSignup";
import { RegistroMascota } from "./pages/RegistroMascota";
import { CarritoPago } from "./pages/CarritoPago";



//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop>
                <Routes>
                    {/* Colocamos useLocation dentro de Routes */}
                    <Route path="*" element={<PageWithNavbar />} />
                </Routes>
                <Footer />
            </ScrollToTop>
        </BrowserRouter>
    );
};

// Nuevo componente para manejar el Navbar
const PageWithNavbar = () => {
    const location = useLocation(); 
    const hideNavbarRoutes = ["/perfilUsuario"];  // Rutas donde ocultamos el Navbar

    return (
        <>
            {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<VistaProducto />} path="/vista-producto/:id" />
                <Route element={<LoginSignup />} path="/loginSignup" />
                <Route element={<VistaMascota />} path="/pets/:id" />
                <Route element={<PerfilUsuario />} path="/perfilUsuario" />
                <Route element={<Demo />} path="/demo" />
                <Route element={<Single />} path="/single/:theid" />
                <Route element={<RegistroMascota />} path="/registro-mascota" />
                <Route element={<CarritoPago />} path="/carrito" />
                <Route element={<h1>Not found!</h1>} path="*" />
            </Routes>
        </>
    );
};

export default injectContext(Layout);

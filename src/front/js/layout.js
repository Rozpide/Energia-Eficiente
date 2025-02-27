import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import LogIn from "./pages/LogIn.jsx";
import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";

import LogInDoc from "./pages/LogInDoc.jsx";
import SingUp from "./pages/SingUp.jsx";

import MedicinaGeneral from "./pages/MedicinaGeneral.jsx";
import Pediatria from "./pages/Pediatria.jsx";
import Ginecologia from "./pages/Ginecologia.jsx";
import Cardiologia from "./pages/Cardiologia.jsx";
import Dermatologia from "./pages/Dermatologia.jsx";
import Ortopedia from "./pages/Ortopedia.jsx";
import Neurologia from "./pages/Neurologia.jsx";
import Oftalmologia from "./pages/Oftalmologia.jsx";
import Otorrinolaringologia from "./pages/Otorrinolaringologia.jsx";
import Endocrinologia from "./pages/Endocrinologia.jsx";



const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<LogIn />} path="/login" />
                        <Route element={<LogInDoc />} path="/logInDoc" />
                        <Route element={<SingUp />} path="/singUp" />

                        {/* Rutas para las especialidades médicas */}
                        <Route element={<MedicinaGeneral />} path="/medicina-general" />
                        <Route element={<Pediatria />} path="/pediatria" />
                        <Route element={<Ginecologia />} path="/ginecologia" />
                        <Route element={<Cardiologia />} path="/cardiologia" />
                        <Route element={<Dermatologia />} path="/dermatologia" />
                        <Route element={<Ortopedia />} path="/ortopedia" />
                        <Route element={<Neurologia />} path="/neurologia" />
                        <Route element={<Oftalmologia />} path="/oftalmologia" />
                        <Route element={<Otorrinolaringologia />} path="/otorrinolaringologia" />
                        <Route element={<Endocrinologia />} path="/endocrinologia" />

                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

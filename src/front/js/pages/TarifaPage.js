/*

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TarifaElectricaList from "../component/TarifaElectricaList";

const TarifaPage = () => {
  const { proveedorId } = useParams(); // Obtén el ID del proveedor desde la URL
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [showLoginModal, setShowLoginModal] = useState(false); // Modal de inicio de sesión
  const [authForm, setAuthForm] = useState({ email: "", password: "" }); // Formulario de autenticación
  const [userPreferences, setUserPreferences] = useState({
    maxPrecioKwH: "",
    preferredRegion: "",
    maxCarbonImpact: "",
  });

  // Maneja cambios en el formulario de autenticación
  const handleAuthChange = (event) => {
    const { name, value } = event.target;
    setAuthForm((prevAuthForm) => ({
      ...prevAuthForm,
      [name]: value,
    }));
  };

  // Maneja cambios en el formulario de preferencias
  const handlePreferencesChange = (event) => {
    const { name, value } = event.target;
    setUserPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value,
    }));
  };

  // Filtra las tarifas según las preferencias del usuario
  const filtrarTarifas = (tarifas) => {
    return tarifas.filter(
      (tarifa) =>
        (userPreferences.maxPrecioKwH === "" ||
          tarifa.precio_kw_hora <= userPreferences.maxPrecioKwH) &&
        (userPreferences.preferredRegion === "" ||
          tarifa.region.toLowerCase() === userPreferences.preferredRegion.toLowerCase()) &&
        (userPreferences.maxCarbonImpact === "" ||
          tarifa.carbon_impact_kgCO <= userPreferences.maxCarbonImpact)
    );
  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetch(`${process.env.BACKEND_URL}/api/login_proveedor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authForm),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la autenticación: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Inicio de sesión exitoso:", data);
        setIsAuthenticated(true);
        setShowLoginModal(false);
        alert("Bienvenido al sistema.");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        alert("Credenciales inválidas o problemas en el servidor.");
      });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    alert("Sesión cerrada.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Tarifas del Proveedor
      </h1>

      
      {!isAuthenticated ? (
        <>
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

          
          <form
            style={{ marginBottom: "20px", textAlign: "center" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <h3>Filtrar Tarifas</h3>
            <input
              type="number"
              name="maxPrecioKwH"
              placeholder="Precio Máximo Kw/h"
              value={userPreferences.maxPrecioKwH}
              onChange={handlePreferencesChange}
              style={{ marginRight: "10px", padding: "0.5rem" }}
            />
            <input
              type="text"
              name="preferredRegion"
              placeholder="Región Preferida"
              value={userPreferences.preferredRegion}
              onChange={handlePreferencesChange}
              style={{ marginRight: "10px", padding: "0.5rem" }}
            />
            <input
              type="number"
              name="maxCarbonImpact"
              placeholder="Impacto Máximo de Carbono"
              value={userPreferences.maxCarbonImpact}
              onChange={handlePreferencesChange}
              style={{ marginRight: "10px", padding: "0.5rem" }}
            />
          </form>

          
          <TarifaElectricaList
            proveedorId={proveedorId}
            filterFunction={filtrarTarifas}
          />
        </>
      )}

      
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
    </div>
  );
};

export default TarifaPage;

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
};*/

/*-------------------------------NUEVO CODIGO----------------*/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TarifaPage = () => {
  const { proveedorId } = useParams(); // Obtén el ID del proveedor desde la URL
  const [tarifas, setTarifas] = useState([]);
  const [error, setError] = useState("");

  // Función para cargar las tarifas
  const cargarTarifas = async () => {
    try {
      const response = await fetch(
        `https://zany-meme-9gw96rvgp45cr6w-3001.app.github.dev/api/proveedores/${proveedorId}/tarifas`
      );

      if (!response.ok) {
        throw new Error("Error al cargar las tarifas del proveedor.");
      }

      const data = await response.json();
      setTarifas(data); // Guarda las tarifas en el estado
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las tarifas.");
    }
  };

  // Llama a cargarTarifas al montar el componente
  useEffect(() => {
    cargarTarifas();
  }, [proveedorId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Tarifas del Proveedor {proveedorId}
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {tarifas.length > 0 ? (
        tarifas.map((tarifa) => (
          <div
            key={tarifa.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            <p>
              <strong>{tarifa.nombre_tarifa}</strong>: ${tarifa.precio_kw_hora} por kWh
            </p>
            <p>Región: {tarifa.region}</p>
            <p>Impacto Carbón: {tarifa.carbon_impact_kgCO} kgCO</p>
          </div>
        ))
      ) : (
        <p>No hay tarifas disponibles para este proveedor.</p>
      )}
    </div>
  );
};

export default TarifaPage;

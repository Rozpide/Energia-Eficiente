import React, { useState, useEffect } from "react";

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [tarifas, setTarifas] = useState([]);
  const [editProveedorId, setEditProveedorId] = useState(null); // ID del proveedor en edición
  const [form, setForm] = useState({
    nombre_proveedor: "nombre",
    contacto: "email",
    website: "website",
  });
  const [showModal, setShowModal] = useState(false); // Modal para edición
  const [warningModal, setWarningModal] = useState(false); // Modal de advertencia
  const [warningMessage, setWarningMessage] = useState(""); // Mensaje de advertencia
  const [error, setError] = useState(null);

  // Función para cargar la lista de proveedores
  const cargarProveedores = async () => {
    const token = localStorage.getItem("access_token"); // Obtén el token JWT almacenado
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/proveedores`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envía el token en el encabezado Authorization
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setProveedores(data); // Establece los datos si son un arreglo válido
      } else {
        throw new Error("La respuesta del servidor no es válida.");
      }
    } catch (err) {
      console.error("Error al cargar proveedores:", err);
      setProveedores([]); // Prevenir errores de renderizado si falla la solicitud
      setError(
        "No se pudieron cargar los proveedores. Por favor, intenta más tarde."
      );
    }
  };
  const cargarTarifasPorProveedor = async (proveedorId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/proveedores/${proveedorId}/tarifas`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar tarifas.");
      }

      const data = await response.json();
      console.log("Tarifas del proveedor:", data);
      // Aquí podrías manejar las tarifas, por ejemplo, mostrando un modal o redirigiendo a otra página
    } catch (err) {
      console.error("Error al cargar tarifas del proveedor:", err);
      alert("No se pudieron cargar las tarifas. Intenta nuevamente.");
    }
  };

  const autenticarProveedor = async (email, password) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/proveedores/autenticar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Autenticación fallida. Verifica tus credenciales.");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.token); // Guarda el token en el almacenamiento local
    } catch (err) {
      console.error("Error al autenticar proveedor:", err);
      alert(err.message); // Informa al usuario si falla la autenticación
    }
  };

  const añadirProveedor = (event) => {
    event.preventDefault();
    console.log("Datos enviados al servidOOOr:", form);
    if (!form.nombre_proveedor || !form.contacto || !form.website) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    fetch(`${process.env.BACKEND_URL}/api/proveedores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Proveedor añadidoOO:", data);
        cargarProveedores();
        setForm({ nombre_proveedor: "", contacto: "", website: "" });
      })
      .catch((error) => console.error("Error al añadir proveeEEdor:", error));
  };

  const eliminarProveedor = (id) => {
    fetch(`${process.env.BACKEND_URL}/api/proveedores/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            const relatedElements =
              err.error.split(": ")[1] || "elementos relacionados";
            throw new Error(
              `Antes de eliminar el proveedor, debe eliminar: ${relatedElements}`
            );
          });
        }
        cargarProveedores(); // Recarga la lista después de eliminar
      })
      .catch((error) => {
        console.error("Error al eliminar proveedor:", error);
        setWarningMessage(error.message); // Mensaje dinámico para el usuario
        setWarningModal(true); // Muestra el modal de advertencia
      });
  };

  const handleEditClick = (proveedor) => {
    setEditProveedorId(proveedor.id);
    setForm({
      nombre_proveedor: proveedor.nombre_proveedor,
      contacto: proveedor.contacto,
      website: proveedor.website || "",
    });
    setShowModal(true); // Abre el modal de edición
  };

  const actualizarProveedor = (event) => {
    event.preventDefault();
    if (!form.nombre_proveedor || !form.contacto || !form.website) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    fetch(`${process.env.BACKEND_URL}/api/proveedores/${editProveedorId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Proveedor actualizado:", data);
        cargarProveedores();
        setShowModal(false);
        setEditProveedorId(null);
      })
      .catch((error) => console.error("Error al actualizar proveedor:", error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditProveedorId(null);
  };

  const closeWarningModal = () => {
    setWarningModal(false);
  };
  // Llama a cargarProveedores al inicializar el componente
  useEffect(() => {
    cargarProveedores();
  }, []);
  return (
    <div>
      <h2>Lista de Proveedores</h2>
      {/* Listado de proveedores */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {proveedores.map((proveedor) => (
          <div
            key={proveedor.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p>
              <strong>{proveedor.nombre_proveedor}</strong> (
              {proveedor.contacto}) - {proveedor.website || "Sin sitio web"}
            </p>
            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={() => eliminarProveedor(proveedor.id)}
                style={{
                  marginRight: "10px",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
              <button
                onClick={() => cargarTarifasPorProveedor(proveedor.id)}
                style={{ padding: "0.5rem 1rem",
                  backgroundColor: "aquamarine",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer", }}
              >
                Ver Tarifas
              </button>
              <button
                onClick={() => handleEditClick(proveedor)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Modificar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para advertencias */}
      {warningModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>No se puede eliminar el proveedor</h3>
            <p>{warningMessage}</p>
            <button
              onClick={closeWarningModal}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal para modificar proveedor */}
      {showModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>Modificar Proveedor</h3>
            <form onSubmit={actualizarProveedor}>
              <input
                type="text"
                name="nombre_proveedor"
                placeholder="Nombre del Proveedor"
                value={form.nombre_proveedor}
                onChange={handleChange}
                required
                style={{
                  marginBottom: "10px",
                  padding: "0.5rem",
                  width: "100%",
                }}
              />
              <input
                type="text"
                name="contacto"
                placeholder="Contacto"
                value={form.contacto}
                onChange={handleChange}
                required
                style={{
                  marginBottom: "10px",
                  padding: "0.5rem",
                  width: "100%",
                }}
              />
              <input
                type="url"
                name="website"
                placeholder="Sitio Web"
                value={form.website}
                onChange={handleChange}
                style={{
                  marginBottom: "10px",
                  padding: "0.5rem",
                  width: "100%",
                }}
              />
              <button
                type="submit"
                style={{
                  marginRight: "10px",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                }}
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={handleCancel}
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

export default ProveedorList;

// Estilos del modal
const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro transparente
  display: "flex",
  justifyContent: "center", // Centrado horizontal
  alignItems: "center", // Centrado vertical
  zIndex: 1000, // Asegura que el modal esté encima de otros elementos
};

const modalContentStyles = {
  backgroundColor: "white", // Fondo blanco para el modal
  padding: "20px", // Espaciado interno
  borderRadius: "8px", // Bordes redondeados
  width: "400px", // Ancho fijo del modal
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Sombra para destacar el modal
  textAlign: "center", // Texto centrado en el modal
};

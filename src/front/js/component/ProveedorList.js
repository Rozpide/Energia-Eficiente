import React, { useState, useEffect } from "react";

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [editProveedorId, setEditProveedorId] = useState(null); // ID del proveedor que se está editando
  const [deleteProveedorId, setDeleteProveedorId] = useState(null); // ID del proveedor que se va a eliminar
  const [form, setForm] = useState({
    nombre_proveedor: "",
    contacto: "",
    website: "",
  });
  const [authForm, setAuthForm] = useState({ email: "", password: "" }); // Formulario de autenticación
  const [authModal, setAuthModal] = useState(false); // Modal para autenticación
  const [authAction, setAuthAction] = useState(null); // Acción pendiente tras autenticación (editar/eliminar)
  const [showModal, setShowModal] = useState(false); // Modal para edición
  const [warningModal, setWarningModal] = useState(false); // Modal para advertencia
  const [warningMessage, setWarningMessage] = useState(""); // Mensaje de advertencia

  // Función para cargar la lista de proveedores
  const cargarProveedores = () => {
    fetch(`${process.env.BACKEND_URL}/api/proveedores`)
      .then((response) => response.json())
      .then((data) => setProveedores(data))
      .catch((error) => console.error("Error al cargar proveedores:", error));
  };

  // Llama a cargarProveedores al inicializar el componente
  useEffect(() => {
    cargarProveedores();
  }, []);

  const añadirProveedor = (event) => {
    event.preventDefault();
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
        console.log("Proveedor añadido:", data);
        cargarProveedores();
        setForm({ nombre_proveedor: "", contacto: "", website: "" });
      })
      .catch((error) => console.error("Error al añadir proveedor:", error));
  };
  const handleChange = (event) => {
    const { name, value } = event.target; // Extrae el nombre y el valor del campo
    setForm((prevForm) => ({
        ...prevForm, // Mantiene los valores previos del formulario
        [name]: value, // Actualiza solo el campo que corresponde al evento
    }));
};

  const eliminarProveedor = () => {
    if (!deleteProveedorId) return;
    fetch(`${process.env.BACKEND_URL}/api/proveedores/${deleteProveedorId}`, {
      method: "DELETE",
      headers: { "Proveedor-Email": authForm.email, "Proveedor-Password": authForm.password }, // Añadimos los datos de autenticación
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
        cargarProveedores();
        setDeleteProveedorId(null); // Limpia el proveedor seleccionado
      })
      .catch((error) => {
        console.error("Error al eliminar proveedor:", error);
        setWarningMessage(error.message);
        setWarningModal(true);
      });
  };

  const handleEditClick = (proveedor) => {
    setEditProveedorId(proveedor.id);
    setForm({
      nombre_proveedor: proveedor.nombre_proveedor,
      contacto: proveedor.contacto,
      website: proveedor.website || "",
    });
    setAuthAction("edit"); // Define la acción pendiente
    setAuthModal(true); // Abre el modal de autenticación
  };

  const handleDeleteClick = (id) => {
    setDeleteProveedorId(id);
    setAuthAction("delete"); // Define la acción pendiente
    setAuthModal(true); // Abre el modal de autenticación
  };

  const actualizarProveedor = (event) => {
    event.preventDefault();
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

  const autenticarProveedor = (event) => {
    event.preventDefault();
    fetch(`${process.env.BACKEND_URL}/api/proveedores/autenticar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authForm),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Autenticación fallida. Verifique sus credenciales.");
        }
        return response.json();
      })
      .then(() => {
        setAuthModal(false); // Cierra el modal de autenticación
        if (authAction === "edit") {
          setShowModal(true); // Abre el modal de edición
        } else if (authAction === "delete") {
          eliminarProveedor(); // Ejecuta la acción de eliminación
        }
        setAuthAction(null); // Limpia la acción pendiente
      })
      .catch((error) => {
        console.error("Error al autenticar proveedor:", error);
        alert(error.message);
      });
  };

  const handleAuthChange = (event) => {
    const { name, value } = event.target;
    setAuthForm({ ...authForm, [name]: value });
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditProveedorId(null);
  };

  const closeWarningModal = () => {
    setWarningModal(false);
  };

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
                onClick={() => handleDeleteClick(proveedor.id)}
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

      {/* Modal de autenticación */}
      {authModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>Autenticación Requerida</h3>
            <form onSubmit={autenticarProveedor}>
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
                  marginRight: "10px",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Autenticar
              </button>
              <button
                type="button"
                onClick={() => setAuthModal(false)}
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

      {/* Modal para editar proveedor */}
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
                  borderRadius: "5px",
                  cursor: "pointer",
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

      {/* Modal de advertencia */}
      {warningModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>Advertencia</h3>
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
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000, // Asegura que el modal esté sobre otros elementos
};

const modalContentStyles = {
  backgroundColor: "white", // Fondo blanco para el contenido del modal
  padding: "20px", // Espaciado interno
  borderRadius: "8px", // Bordes redondeados
  width: "400px", // Ancho fijo para el modal
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Sombra para destacar el modal
  textAlign: "center", // Texto centrado en el modal
};

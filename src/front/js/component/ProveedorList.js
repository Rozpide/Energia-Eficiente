import React, { useState, useEffect } from "react";

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [editProveedorId, setEditProveedorId] = useState(null); // ID del proveedor que se está editando
  const [form, setForm] = useState({
    nombre_proveedor: "",
    contacto: "",
    website: "",
  });
  const [showModal, setShowModal] = useState(false); // Modal para edición
  const [warningModal, setWarningModal] = useState(false); // Modal para advertencia de relaciones
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

  const eliminarProveedor = (id) => {
    fetch(`${process.env.BACKEND_URL}/api/proveedores/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          // Capturamos el mensaje específico del backend
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
        setWarningMessage(error.message); // Establece el mensaje dinámico
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
    setShowModal(true);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditProveedorId(null);
  };

  const closeWarningModal = () => {
    setWarningModal(false); // Cierra el modal de advertencia
  };

  return (
    <div>
      <h2>Lista de Proveedores</h2>

      {/* Formulario de creación de proveedor */}
      <form
        onSubmit={añadirProveedor}
        style={{ marginBottom: "2rem", textAlign: "center" }}
      >
        <h3>Añadir Proveedor</h3>
        <input
          type="text"
          name="nombre_proveedor"
          placeholder="Nombre del Proveedor"
          value={form.nombre_proveedor}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "0.5rem", width: "20%" }}
        />
        <input
          type="text"
          name="contacto"
          placeholder="Contacto"
          value={form.contacto}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "0.5rem", width: "20%" }}
        />
        <input
          type="url"
          name="website"
          placeholder="Sitio Web"
          value={form.website}
          onChange={handleChange}
          style={{ marginRight: "10px", padding: "0.5rem", width: "20%" }}
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
          Crear Proveedor
        </button>
      </form>

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

      {/* Modal para advertencia */}
      {warningModal && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h3>No se puede eliminar el proveedor</h3>
            <p>{warningMessage}</p> {/* Mensaje dinámico desde el backend */}
            <button
              onClick={() => setWarningModal(false)}
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

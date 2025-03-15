import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Modal, Button, Form } from 'react-bootstrap';
import "../../styles/home.css";

export const VistaMascota = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editedPet, setEditedPet] = useState({
    name: "",
    breed: "",
    size: "",
    age: "",
    pathologies: ""
  });

  const getPetDetails = async (id) => {
    try {
      const resp = await fetch(`${process.env.BACKEND_URL}/api/pets/${id}`);
      if (resp.status === 404) {
        // Si la respuesta es 404, la mascota no existe
        setPetDetails(null);
      } else {
        const petData = await resp.json();
        setPetDetails(petData);
        setEditedPet({
          name: petData.name || "",
          breed: petData.breed || "",
          size: petData.size || "",
          age: petData.age || "",
          pathologies: petData.pathologies || ""
        });
      }
    } catch (error) {
      console.error("Error al obtener los detalles de la mascota", error);
      setPetDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPetDetails(id);
  }, [id]);

  // Cuando ya terminó de cargar y no se encontró la mascota, redirige a Not Found
  useEffect(() => {
    if (!loading && petDetails === null) {
      navigate("/not-found");
    }
  }, [loading, petDetails, navigate]);

  const handleDelete = async () => {
    try {
      await actions.deletePet(id);
    } catch (error) {
      console.error("Error al eliminar la mascota (se ignora):", error);
    }
    navigate("/perfilUsuario");
  };

  const handleEdit = async () => {
    try {
      await actions.editPet(id, editedPet);
    } catch (error) {
      console.error("Error al editar la mascota (se ignora):", error);
    }
    setShowModal(false);
    navigate("/perfilUsuario");
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  // Si no se encontró la mascota, ya se redirige a Not Found en el useEffect
  if (!petDetails) return null;

  return (
    <div className="container mt-5">
      <h2>Detalles de la Mascota</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <img
              src={petDetails.url || '/default-image.jpg'}
              alt={petDetails.name}
              className="card-img-top"
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="card-body">
              <h5 className="card-title">{petDetails.name}</h5>
              <p className="card-text"><strong>Especie:</strong> {petDetails.breed}</p>
              <p className="card-text"><strong>Tamaño:</strong> {petDetails.size}</p>
              <p className="card-text"><strong>Edad:</strong> {petDetails.age}</p>
              <p className="card-text"><strong>Patologías:</strong> {petDetails.pathologies}</p>
              <Button variant="warning" onClick={() => setShowModal(true)} className="me-2">
                ✏️ Editar
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                🗑️ Eliminar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar mascota */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={editedPet.name || ""}
                onChange={(e) => setEditedPet({ ...editedPet, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Especie</Form.Label>
              <Form.Control
                type="text"
                value={editedPet.breed || ""}
                onChange={(e) => setEditedPet({ ...editedPet, breed: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tamaño</Form.Label>
              <Form.Control
                type="text"
                value={editedPet.size || ""}
                onChange={(e) => setEditedPet({ ...editedPet, size: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="text"
                value={editedPet.age || ""}
                onChange={(e) => setEditedPet({ ...editedPet, age: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Patologías</Form.Label>
              <Form.Control
                type="text"
                value={editedPet.pathologies || ""}
                onChange={(e) => setEditedPet({ ...editedPet, pathologies: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';

export const CarritoPago = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [newContact, setNewContact] = useState({
        nombre: "",
        apellidos: "",
        dirección: "",
        códigoPostal: "",
        provincia: "",
        teléfono: "",
        email: "",
    });

    const productos = store.cart;

    const [carrito, setCarrito] = useState(
        productos.map(producto => ({ ...producto, cantidad: 1 }))
    );

    const handleChange = (e) => {
        setNewContact({
            ...newContact,
            [e.target.name]: e.target.value,
        });
    };

    const handleCantidadChange = (productoId, cantidad) => {
        const cantidadFinal = Math.max(1, cantidad); // Asegura que la cantidad sea al menos 1
        setCarrito(carrito.map(item =>
            item.id === productoId ? { ...item, cantidad: cantidadFinal } : item
        ));
    };

    const calcularTotal = () => {
        const subtotal = carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
        const total = subtotal + (subtotal * 0.21); // Incluyendo IVA
        const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        return { subtotal, total, totalUnidades };
    };

    const { subtotal, total, totalUnidades } = calcularTotal();

    const checkout = (e) => {
        e.preventDefault();

        const orderData = {
            selected_food: store.cart.map(item => item.id),
            selected_accessory: [],
            status: "carrito",
        };

        actions.createOrder(orderData)
            .then(response => {
                if (response.success) {
                    console.log("Orden creada exitosamente");

                    // Cambiar a la pestaña de "Dirección de envío y pago"
                    const profileTabElement = document.getElementById('profile-tab');
                    if (profileTabElement) {
                        const profileTab = new window.bootstrap.Tab(profileTabElement);
                        profileTab.show(); // Activa la pestaña
                    } else {
                        console.error("No se encontró el elemento con id 'profile-tab'");
                    }
                } else {
                    console.error("Error al crear la orden:", response);
                }
            })
            .catch(error => {
                console.error("Error al enviar la orden:", error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos enviados:', newContact);
    };

    const handleRemoveProduct = (productoId) => {
        // Eliminar del estado local
        const nuevoCarrito = carrito.filter(item => item.id !== productoId);
        setCarrito(nuevoCarrito);

        // Eliminar del estado global
        actions.removeFromCart(productoId);
    };

    useEffect(() => {
        console.log("Carrito actualizado:", store.cart);
    }, [store.cart]);

    return (
        <div className="container-fluid justify-content-center mt-1 p-3 text-dark">
            <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">1. Carrito de compra</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">2. Dirección de envío y pago</a>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                    <div className="container-fluid overflow-hidden my-4 d-flex w-75">
                        <div className="row col-md-6 flex-grow-1">
                            <h3 className="p-3">Productos en el carrito:</h3>

                            {productos.length === 0 ? (
                                <p>No hay productos en el carrito.</p>
                            ) : (
                                productos.map(producto => (
                                    <div className="col-md-8" key={producto.id}>
                                        <div className="card mb-3 d-flex flex-column">
                                            <div className="row card-prueba g-0 flex-fill">
                                                <div className="col-md-2">
                                                    <img
                                                        src={producto.url}
                                                        alt="Producto"
                                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body d-flex flex-column flex-grow-1">
                                                        <h5 className="card-title"><strong>{producto.name}</strong></h5>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center m-3">
                                                        <div>
                                                            <h2 className="card-text text-sm-start">{producto.price}€</h2>
                                                        </div>
                                                        <div className="d-flex align-items-center" style={{ width: '100px' }}>
                                                            <label htmlFor={`cantidad-${producto.id}`} className="form-label visually-hidden">Cantidad:</label>
                                                            <select
                                                                className="form-select form-select-sm"
                                                                id={`cantidad-${producto.id}`}
                                                                value={carrito.find(item => item.id === producto.id)?.cantidad || 1}
                                                                onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value))}
                                                            >
                                                                <option value="1">1 ud.</option>
                                                                <option value="2">2 uds.</option>
                                                                <option value="3">3 uds.</option>
                                                            </select>
                                                            <button
                                                                className="btn btn-light btn-sm ms-auto"
                                                                onClick={() => handleRemoveProduct(producto.id)}
                                                            >
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="row carrito col-md-3 m-3 p-4 rounded border" style={{ width: "400px", height: "400px" }}>
                            <h3 className="p-3">Resumen del carrito</h3>
                            <ul>
                                {carrito.map(item => (
                                    <li key={item.id}>
                                        {item.name} - {item.cantidad} unidades
                                    </li>
                                ))}
                            </ul>
                            <p>Total de productos: {totalUnidades}</p>
                            <p>Subtotal: {subtotal}€</p>
                            <p>IVA (21%): {(subtotal * 0.21).toFixed(2)}€</p>
                            <h4><strong>Total: {total.toFixed(2)}€</strong></h4>

                            <button onClick={checkout} className="btn btn-primary">
                                Confirmar y pagar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
          <div className="container-fluid overflow-hidden my-3 w-50">
            <form className="form" onSubmit={handleSubmit}>
              <h2 className="text-start">Dirección y método de envío</h2>
              <div className="row mb-3">
                <div className="col-sm-6">
                  <label htmlFor="inputFullName1" className="col-form-label">Nombre</label>
                  <input type="text" className="form-control" id="inputFullName1" placeholder="Nombre" onChange={handleChange} name="nombre" value={newContact.nombre} />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="inputFullName2" className="col-form-label">Apellidos</label>
                  <input type="text" className="form-control" id="inputFullName2" placeholder="Apellidos" onChange={handleChange} name="apellidos" value={newContact.apellidos} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-6">
                  <label htmlFor="inputPhone" className="col-form-label">Teléfono</label>
                  <input type="text" className="form-control" id="inputPhone" placeholder="Teléfono" onChange={handleChange} name="teléfono" value={newContact.teléfono} />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="inputEmail" className="col-form-label">Email</label>
                  <input type="text" className="form-control" id="inputEmail" placeholder="Email" onChange={handleChange} name="email" value={newContact.email} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <label htmlFor="inputAddress" className="col-form-label">Dirección</label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="Ingrese dirección" onChange={handleChange} name="dirección" value={newContact.dirección} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-6">
                  <label htmlFor="inputPostal" className="col-form-label">Código Postal</label>
                  <input type="text" className="form-control" id="inputPostal" placeholder="Código Postal" onChange={handleChange} name="códigoPostal" value={newContact.códigoPostal} />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="inputCiudad" className="col-form-label">Ciudad</label>
                  <input type="text" className="form-control" id="inputCiudad" placeholder="Ciudad" onChange={handleChange} name="ciudad" value={newContact.ciudad} />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-sm-6">
                  <div className="p-3 bg-success text-dark bg-opacity-25 rounded">
                    <input className="form-check-input" type="radio" name="envio" id="envioUrgente" value="urgente" />
                    <label className="form-check-label" htmlFor="envioUrgente">
                      <h5 className="m-0">Envío urgente 4,99€</h5>
                      <p>24/48 horas MRW</p>
                    </label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 bg-success text-dark bg-opacity-25 rounded">
                    <input className="form-check-input" type="radio" name="envio" id="envioGratuito" value="gratuito" />
                    <label className="form-check-label" htmlFor="envioGratuito">
                      <h5 className="m-0">Envío gratuito</h5>
                      <p>Plazo de 3 a 4 días. Puntos de recogida Mondial Relay</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-start gx-2">
                <button type="submit" className="btn btn-primary me-1">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={() => setNewContact({ nombre: "", apellidos: "", dirección: "", códigoPostal: "", provincia: "", teléfono: "", email: "" })}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import '../../styles/InfoAlbum.css';

export const InfoAlbum = () => {
    const { store, actions } = useContext(Context)
    const [newComment, setNewComment] = useState("");
    const [commentList, setCommentList] = useState([]);

    return (
        <div className="container">
            <div className="row p-4 justify-content-center">
                <div className="card-info card col-md-5">
                    <img src="https://www.efeeme.com/wp-content/uploads/2016/08/Rolling-Stones-03-08-16-b.jpg" className="img-card card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Titulo: Origins</h5>
                        <p className="card-text">Año: </p>
                        <p className="card-text">Artista: </p>
                        <p className="card-text">Género: </p>
                        <p className="card-text">Fecha de la compra: </p>
                        <p className="card-text">Nº ID de la compra: </p>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Cantidad de productos: </p>
                        <p className="card-text">TOTAL: </p>

                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Comprar
                        </button>

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body text-black">
                                        ...
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary">Confirmar compra</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-coment text-black border-start border-3 border-danger ms-3 col-md-6">
                    <div className="p-3">
                        <h3>Comentarios</h3>
                    </div>
                    <div className="list-comments">
                        {commentList.map((text, index) => (
                            <div className="list-group">
                                <li className="list-group-item m-1 d-flex justify-content-between">
                                    <div>{text}</div>
                                    <a href="#!"><i className="btn-close" onClick={() => setCommentList(commentList.filter((t, currentindex) => index !== currentindex))}></i></a>
                                </li>
                            </div>
                        ))}
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control bg-light" placeholder="Deja tu comentario"
                            onChange={(e) => setNewComment(e.target.value)}
                            value={newComment} />
                        <button className="btn btn-danger" type="button" onClick={() => { setCommentList(() => [...commentList, newComment]); setNewComment(''); }}>Añadir</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
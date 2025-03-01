import React from "react";
import { useContext, useState } from "react";
//import { useParams } from "react-router";
import { Context } from "../store/appContext.js";
import { Carousel } from "../component/carousel.js";
import '../../styles/Sixty.css'

export const Decada = () => {
    const { store, actions } = useContext(Context)
    const [border, setBorder] = useState("")
    //const { decada } = useParams()
    

    return (
        <div className="genero container">
            <div className="p-3 text-center text-light">
                <h1 className="text-danger" style={{ fontSize: '80px' }}>60's</h1>
            </div>
            <div className={'p-4 text-light border-bottom border-danger'+ (border === "Rock" ? " border-4 border-danger" : "")} onMouseOver={()=> setBorder("Rock")} onMouseLeave={()=> setBorder("")}>
                <div>
                    <h2 className={'col-1 text-center pt-2 border rounded border-danger'+ (border === "Rock" ? " border rounded border-4 bg-dark" : "")}><span className="text-danger fw-bold">R</span>OCK</h2>
                </div>
                <div>
                    <Carousel />
                </div>
            </div>
            <div className={'p-4 text-light border-bottom border-danger'+ (border === "Funk" ? " border-4 border-danger" : "")} onMouseOver={()=> setBorder("Funk")} onMouseLeave={()=> setBorder("")}>
                <div>
                    <h2 className={'col-1 text-center pt-2 border rounded border-danger'+ (border === "Funk" ? " border rounded border-4 bg-dark" : "")}><span className="text-danger fw-bold">F</span>UNK</h2>
                </div>
                <div>
                    <Carousel />
                </div>
            </div>
            <div className={'p-4 text-light border-bottom border-danger'+ (border === "Pop" ? " border-4 border-danger" : "")} onMouseOver={()=> setBorder("Pop")} onMouseLeave={()=> setBorder("")}>
                <div>
                    <h2 className={'col-1 text-center pt-2 border rounded border-danger'+ (border === "Pop" ? " border rounded border-4 bg-dark" : "")}><span className="text-danger fw-bold">P</span>OP</h2>
                </div>
                <div>
                    <Carousel />
                </div>
            </div>
            <div className={'p-4 text-light border-bottom border-danger'+ (border === "Jazz" ? " border-4 border-danger" : "")} onMouseOver={()=> setBorder("Jazz")} onMouseLeave={()=> setBorder("")}>
                <div>
                    <h2 className={'col-1 text-center pt-2 border rounded border-danger'+ (border === "Jazz" ? " border rounded border-4 bg-dark" : "")}><span className="text-danger fw-bold">J</span>AZZ</h2>
                </div>
                <div>
                    <Carousel />
                </div>
            </div>
        </div>
    );
};
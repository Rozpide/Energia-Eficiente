import React, { Component, useState, useEffect } from "react";
import { Producto } from "../component/producto";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export const VistaProducto = () => {
    const [detallesProducto, setDetallesProduto] = useState({});
    const {id} = useParams();


    const getInfoProducto = async ()=>{
        const myHeaders = new Headers();
        myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZsWXlaTeJPKj71_qrJMXXteXpAWDSbXFuI8hriwQa8_KlAdToRFJL_4mcenP4X4lC1xYLHse-Zrcw7IevLi5xnS9znqeCHpxUlyRHLluajJvGgFv8wARVF0uf_cGTHBLtTfvxpD3r2DwlfB8AxXhLUusi9kUuJincYZr9pqfHL1enZbtSzhz0eRbLEhXf-7a69TbqvkbJ5uVRIm-QfWBqimk8G8PzULPd4i_0LPP7N4hoIETPgfaQ9HOXkG0Dl66hwNLGVk0y3uMh_9yiNHV1_7USXJFnVnWdoqrWEd-VtqMQG2FSxXbQzJ2USae1J6XKfdMjt3Gtf0c96vJkVmZdraL548Rr49j_0LIcxBhHW65KFuIQijKjrUCNSPg9vy_25fNNL_TagO-IEg0NhKfAJTsKTdzBFUmklwQ6SI1_74WtvJYSHJID5dLjsVd9DqCAtuiHFvLFGrH0yZm44buKQYlTscQX0n5q8-BVUxOahYcVY5rrXTazqfBYBkWZtWr-_qsPkxqiwio1AavDxPhNLK22voSrkDJy5X2NN69Z2gbafvs6cq0ZXmidyVml1CRrVi3mTXwjU4MhSOzav57YNinionWCFkFR_kkZZAGXVAlYPshndJSAOCyraX5wNoSeleefe-KFmN2R2akzIUoeExvoKu0uZwvAXamxLSyjVpFjyCO6IkCIqgeeQoUIVg6ZCBvMIbFV4-WPHTHEPauQk6NJoE2SReXwIzgGEAafuDRT5u6XO0IAhAHW1_Iml5OrezrpcFah06gSTQGQNYaD2pVWGOVmRoYSCxF2YsCTDAKW9QyD6eFWm9w2a4rNN53IkbbBRwWLSW4aQha9f8DphV-Ym5Ldx9pIHjjAOkiSWUuQyeik-W8NVzwCaH-RBUTFCSxMdhtS68RPgxnqo5A1ZOO0icHMDQOJ5wvKc7hOCnPV20qTDsnIo8p3YApPQtjLRAuqybqx3mGf5hp9EWlApF");

        const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

        try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/foods/${id}`, requestOptions);
        const data= await response.json();
        setDetallesProduto(data)
        console.log(result)
        } catch (error) {
        console.error(error);
        }
    }
        

    
    
    
      useEffect(() => {
      getInfoProducto();
      }, []);
  
    return (

  
<div className="flex-container mt-5 text-center">
        <Producto
        data={detallesProducto}
        id={id}
    
        
        />
    <hr className="mt-5" style={{width: "90%"}}></hr>
    <div className="sección similares my-5">
				<h3>Productos similares</h3>
				<div className="row justify-content-center my-5">
				
            <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
            <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
            <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
            <div className="col-md-3 border m-2" style={{ width: "20%", height: "300px" }}></div>
				</div>
			</div>

</div>



    );
}
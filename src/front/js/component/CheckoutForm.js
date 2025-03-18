import { CardElement, useStripe, useElements, AddressElement, CardNumberElement, PaymentElement } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import React from "react"
 
 export const CheckoutForm = () => {
     const stripe = useStripe()
     const elements = useElements()
     console.log(elements);
 
     const [loading, setLoading] = useState(false)
     const [paymentStatus, setPaymentStatus] = useState(null);
 
 
 
     const handleSubmit = async (event) => {
         event.preventDefault();
 
         const result = await stripe.confirmPayment({
             elements,
             confirmParams: {
              return_url: "https://automatic-disco-jj4x947jggrrfp6-3000.app.github.dev/"
             },
             redirect: 'if_required'
         });
 
         if (result.error) {
             // Si hay un error, establece el estado con el mensaje de error
             setPaymentStatus(result.error.message);
             console.error(result.error.message);
         } else {
             // Aquí puedes manejar el resultado del pago
             // Puedes verificar el estado de la confirmación de pago
             if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
                 setPaymentStatus("Pago exitoso!");
                 console.log("pago exitoso");
 
                 // Aquí puedes realizar otras acciones, como actualizar el estado de la aplicación
                 // o mostrar un modal de agradecimiento sin redirigir.
             } else {
                 setPaymentStatus("El pago no se pudo completar.");
             }
         }
     };
 
     return (
         <form className="w-50 bg-dark mx-auto p-3" onSubmit={handleSubmit}>
             <PaymentElement />
             <button className="btn btn-secondary w-100 mt-2" type="submit" disabled={!stripe || loading}>Pagar</button>
         </form>
     );
 }

//     // Obtén el client_secret del backend cuando el componente se monte
//     useEffect(() => {
//         const fetchClientSecret = async () => {
//             try {
//               const response = await fetch(`${process.env.BACKEND_URL}/api/create-payment`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ amount: 10, currency: "eur" }),  // Cambia el monto y la moneda según sea necesario
//                 });
//                 const data = await response.json();
//                 setClientSecret(data.client_secret);  // Guarda el client_secret en el estado
//             } catch (err) {
//                 console.error("Error al obtener el client_secret:", err);
//             }
//         };

//         fetchClientSecret();
//     }, []);

//     // Maneja el envío del formulario
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements || !clientSecret) {
//             return;
//         }

//         setLoading(true);

//         try {
//             // Confirma el pago con Stripe
//             const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: elements.getElement(CardElement),
//                 },
//             });

//             if (stripeError) {
//                 setError(stripeError.message);  // Muestra el error si el pago falla
//             } else if (paymentIntent.status === "succeeded") {
//                 console.log("Pago exitoso:", paymentIntent);
//                 alert("Pago exitoso!");  // Muestra un mensaje de éxito
//             }
//         } catch (err) {
//             console.error("Error al procesar el pago:", err);
//             setError("Ocurrió un error al procesar el pago.");
//         } finally {
//             setLoading(false);  // Desactiva el estado de carga
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="w-50 bg-light mx-auto p-4">
//             <CardElement options={{
//                 style: {
//                     base: {
//                         fontSize: "16px",
//                         color: "#424770",
//                         "::placeholder": {
//                             color: "#aab7c4",
//                         },
//                     },
//                     invalid: {
//                         color: "#9e2146",
//                     },
//                 },
//             }} />
//             {error && <div className="text-danger mt-2">{error}</div>}
//             <button type="submit" disabled={!stripe || loading} className="btn btn-primary mt-3">
//                 {loading ? "Procesando..." : "Pagar"}
//             </button>
//         </form>
//     );
// };


// // import React, {useState, useEffect} from "react";
// // import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// // export const CheckoutForm = () => {
// //     const stripe = useStripe();
// //     const elements = useElements();
// //     const [clientSecret, setClientSecret] = useState('');
// //     const [loading, setLoading] = useState(false);
  
// //     useEffect(() => {
// //         const paymentIntent = () => {
// //           fetch('https://redesigned-space-carnival-rj4qx755rgjcw7v-3001.app.github.dev/api/create-payment', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ amount: 1000, currency: 'usd' }) 
// //         })
// //           .then((res) => res.json())
// //           .then((data) => setClientSecret(data.client_secret));
// //       }
// //       paymentIntent()
// //       }, []);


// //     const handleSubmit = async (event) => {
// //       event.preventDefault();
  
// //       if (!stripe || !elements) {
// //         return;
// //       }
  
// //       setLoading(true);
  
// //       const { error, paymentIntent } = await stripe.confirmCardPayment(
// //        clientSecret,{
// //           payment_method: {
// //             card: elements.getElement(CardElement),
// //           },
// //         },
// //       );
  
// //       setLoading(false);
  
// //       if (error) {
// //         console.log('[error]', error);
// //       } else if (paymentIntent.status === 'succeeded') {
// //         console.log('Payment succeeded!');
// //       }
// //       else{
// //         console.log('some error')
// //       }
// //     };
  
// //     return (
     
// //       <form className="w-50 bg-light mx-auto" onSubmit={handleSubmit}>
// //         <CardElement />
// //         <button type="submit" disabled={!stripe || loading}>
// //           Pay
// //         </button>
// //       </form>
// //     );
// //   };
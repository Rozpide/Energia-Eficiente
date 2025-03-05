import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const GeneralBalance = () => {
  const [balance, setBalance] = useState(0);

  const {store,actions} = useContext(Context)

  const generalBalance = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yar..."
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch
        (`${process.env.BACKEND_URL}/api/user/${store.user.id}/accounts`,
        requestOptions
      );
      const data = await response.json();
// console.log(data[0].balance);
setBalance(data.result[0].balance);



      //  Ajustar según la estructura real de la API
    //   if (data && Array.isArray(data.valores)) {
    //     const totalBalance = data.valores.reduce((acc, num) => acc + num, 0);
    //     setBalance(totalBalance);
    //   } else {
    //     console.error("Estructura de datos inesperada:", data);
    //     setError("Formato de datos incorrecto");
    //   }
    } catch (error) {
      console.error("Error al obtener el balance:", error);
    }
  };

  useEffect(() => {
    generalBalance()
  }, []);

  return (
   <h1 className="text-2xl font-bold">{balance} euros</h1>
  );
};

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
            token: null,
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            dogFood: [],
            catFood: [],
            exoticFood: [],
            accessories: [],
            cart: []
        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            login: async (email, password, navigate) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (!resp.ok) {
                        throw new Error("Error al iniciar sesión");
                    }

                    const data = await resp.json();
                    console.log("Inicio de sesión exitoso:", data);

                    const token = data.token;
                    if (!token) {
                        throw new Error("No se recibió el token");
                    }

                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(data.user)); // 🔹 Guarda el usuario
                    setStore({ token });

                    const actions = getActions();
                    actions.getUser();
                    navigate("/");
                } catch (error) {
                    console.log("Error al iniciar sesión", error);
                    alert("Error al iniciar sesión");
                }
            },
            signup: async (dataUser, navigate) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(dataUser)
                    });

                    if (!resp.ok) {
                        throw new Error("Error en el registro");
                    }

                    const data = await resp.json();
                    console.log("Usuario registrado exitosamente", data);

                    const token = data.token;
                    if (!token) {
                        throw new Error("No se recibió el token");
                    }

                    localStorage.setItem("token", token);
                    setStore({ token });

                    const actions = getActions();
                    actions.getUser();
                    navigate("/");
                } catch (error) {
                }
            },
            getUser: async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) throw new Error("No token found");

                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (!resp.ok) throw new Error("Error al obtener el usuario");

                    const data = await resp.json();
                    setStore({ user: data });
                } catch (error) {
                    console.log("Error al obtener usuario", error);
                }
            },
            logout: () => {
                localStorage.removeItem("token");
                localStorage.removeItem("user"); // 🔹 Eliminar usuario de localStorage
                setStore({ token: null, user: null, pets: [] });
            },

            loadUserFromStorage: () => {
                const token = localStorage.getItem("token"); //Cargar usuario
                const user = localStorage.getItem("user");

                if (token && user) {
                    setStore({ token, user: JSON.parse(user) });
                }
            },
            //TRAER ALIMENTO POR GRUPOS
            getDogFood: async () => {
                const myHeaders = new Headers();
                myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZs0q_CxPIxRcsYOazLvQz4rP7s5FWFmvGJndFqy0N7fvoY5B6Jou5i4ZPgwsQZsEYGDV4DoaNhJP3xwIvv1aGmoRIVdScF1G2c_hWBWqeCTHFNCvGD1Dy0sm3kBmaNdXiMsSO0myHKUFvlWHCed2AdtyCiC6CHBqk9DHs32cYjJV4GQr4cxW2IXl6QDukWwCPSYuzTnP699Rz_4pCbB8OPOQNBDyDtdks_LUoMZR2Qt6IWKmUnLGt-n3JLFjeQMZiSeKEXKNTcJknrz4p25p9-5rh3BY2FBX_kg6MtH3cLbqOyS6yqrG4cjJPpyZbVfN3iEYSR6lzEGiGZDFPvokcj_PM8fq32HR1_olrhti8nYtDctNR_8YRewW5quhBNW6mtF_-SqGTbCQVH1CiLUF2UKK_H_nGmwvWAce2n4Cdw1BLUCZhlCr3GAKWJWHqLI1K5n9OekmI4zs0TI_60R6urTRxIQx2IgkRPYizg-AUdyr6bORhYr7s3c6oFBrdA4yBShqyJFOo4fuMkQuHflmg717cZeB1MDnWgSm9Xnl4qmOlcta0fCSq15GNUPvXhAwvclIoK9NTrmSSd1wvRhoqz7ypodxTSOafQx0ybhJZwTxDeS_gv-4KjbyFngwj7Bj1TluB2qE5Hijbi4uhZb2KILE9AGYHKWSW-IWoSmEXW71c7HhH8mBEbBxidpsSi_Rip3CdXL2oUO-8TGtLx2HgJtExj_7AyTD1trSanlKgDurPSEfDuXuwtqxawfWf0a1sbp9BGk0pRLOA-tVKrxmMiFAPiNCVC1W2EXb95TKydzKIwtbcC70YyDJ4dFwnHrQmgPYxzIz7PYzICzKqZ-VDpO4lf7C3jf4OBJ9ZMV4JRvPiR2kUwMNX_c5CuMLaKrZNzqCFwZBUa4N4AUyTT83mtzFQGAZjMXDeZNok7mjTYBp121qquiSKX8ft05b1MTsVtRfg3ETiFdOHmYQ2-1EcSwBY-VhjWIlkQiFr1yBWXk-g");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/foods/dog", requestOptions);

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setStore({ dogFood: data });
                } catch (error) {
                    console.error('Error fetching dog food:', error);
                }
            }




            ,
            getCatFood: async () => {

                const myHeaders = new Headers();
                myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZsFuWJUB8pT978IgBH2YtuNtjrSfloWcBx8Cb4ny9waQSc6YIxDXdFsnq7Re1iGbqt37RMJ8vfb6ibKLFqvloDFsbiBuxDcqwi_MvYRhr2Z463usLkj3RbhHXQfm0TDnuAtNaE3deMSqRX9yv4T0Ui6indSlqpCNa-EX0tvUPEUYniNtvBPGilr_PC-U4inRAN5RaUZvcfD9vs4fenjYjUAaDpz49MnUZT8uGDozBeAZynLSYkXtpY9Rb2GuG-eOvk-8noe3tIekVKBOTjnaeis5QUJJpYcv73D6GOrYSIpavdb29mY6QWEsir-s4vxW2wE0dCb8n5g4MldUigDSxrKnndHoBleQih8VqWGo5AZKTYLT3Y735A7ZsmFGvFjRGrrGCPQ6YU28RddH4ieKxoVlTt2PG2uD17_QI5FmUNuvz3Z8YDAK878jEXK-_jXm5SIi4oLvfCr9sezmoc8NgcvJBAH0lVlJCf3kz9Z7_y_5wwU9a4Nk6-rH2p__Jb49iHxfOuRu0EzOLdNHiPfznR8iEp41VsK7ie7ECmM5Q6SANKFM9AtYkbXqCmn5tAdmrCFaGKNAu8w7gZ_r97mDMzcHVOwUktErNC1y2j6yUPv6SAU9hVk4_xFev-2wI7h5PEaPCY3khPgI6Z1UPNC_SkodFGHbEdRUSMc8ICYoAv4llTD8xtfOqzMDms4HG1xcbJrE1NTWh4rpfv7KiEIi6iqE6uizX7_CmWJkcA9SGig9hk9A9abtYb2Pg8Z8GG2cEan7FFpl7kbvTobFfSGn_N9ukSCqYuuoldgSno8yyH5P3E7oqqVnO1eT3kpRGZ9EdtmL5zXv8Fs-x3GDrQ2z1_V6sqMxy6LlXHXJ7m6MYUy4sET4nISyUJ1H2eBbC-Ttk7_7om7ByATu_oEZjPFefBf7sXaCZ2ng9ZBYYOOZHtbUEs2rrFAiL6dmrgjKVaXUyz3KiiP73Dy5OR7g9ccYBD5t74jdyVYPLmgoasQocdBEA");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/foods/cat", requestOptions);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setStore({ catFood: data });
                } catch (error) {
                    console.error('Error fetching cat food:', error);
                }
            }
            ,

            getExoticFood: async () => {
                const myHeaders = new Headers();
                myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZuqp5-e7T1vVCCdEQ0C1wStd1vPjajnZKjnPSA5Hq6rqD8KnBNHzrxCrSBqwnlunA0rkm36DsRzpvbpKLHVNklCfX8GBsMZKstrANOENBUzsSi1PBxW5_TibtPeRePzgNe5pBHuYx5F-1zm7-FoplLOZKZUFeRu1ua1DgiPeOiqvYSnKMQISiWoLb64DlQlSfXIGkFzVDFsFNPJ5lN-NHmI9dQ4O8b8EtoLAvXug1GQ5WkthHTcarTf_lXY5fcoEJbvhObGkUw7LC07jfKn2BTk27bZGx_F2kXNKq2N32CJ_46MMiulhV3sVpuuBUenZ-P7eLMcyMYuz6LcVrybPlrmHBiCnIbgcmgn-jnL-P3rcWL49L8RpPU84Ul4CaOZTFZ7eFCUqa1m1YKjX21YEdJlEm8fyYpFYcFp_9mGziKaxChcel7DevH4J4NV-E1mEUnQP-wDBMVq1IH0wdb4_HSnZ8aBhyyb8GvuEuLIhlH4soY8xtKNlaM73kynXCEhJ2OH-eKM6XIkWQHVIENwRoWzjj8G-8jQcJjz1Clyo9lMuFB98AWfsJgqe_PO7PgIw_Ms8_hRKyGG_aej9UuBo8rS-u4vTGaj5v_1vp6_PrZ-qEp8iyGGK_0OERl5OH0S3_mcXOd1wQcpFQ76RR6qtXqju2G8WkN9e3xC9XvP3SWVDIc5195fVj_1gRGLUCC20Uu5uPC0yzuE2X_TrcjKq0-SeWiyVIphc1T7AoJ2PvAu74js-66UPPcjXqoQvGXCzwrwhPdzXAp8n6sVwGcfRthrk2AOD4U8XJz68aBA5aRx77sqsMKKFIbCRXjRfOcAoa214qR5Oz7-nnKj1dII9Rx_g9ZD7SS_Mjm5Sk3M_Mr0zZNDzN7YWd_j3WhN9Gvr1MOeU6aFKssi2wzLgyNAVHNaXxjKms7cV1bDDwVzfYcHa6L-oLvvPk1FRmoRsD4J_3I7TgE1iO2LOtWD4ZLYilAcmmiHh3OPqNpQrKkl5uK2zg");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/foods/exotic", requestOptions);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setStore({ exoticFood: data });
                } catch (error) {
                    console.error('Error fetching cat food:', error);
                }
            }
            ,

            getAccessories: async () => {
                const myHeaders = new Headers();
                myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZuqp5-e7T1vVCCdEQ0C1wStd1vPjajnZKjnPSA5Hq6rqD8KnBNHzrxCrSBqwnlunA0rkm36DsRzpvbpKLHVNklCfX8GBsMZKstrANOENBUzsSi1PBxW5_TibtPeRePzgNe5pBHuYx5F-1zm7-FoplLOZKZUFeRu1ua1DgiPeOiqvYSnKMQISiWoLb64DlQlSfXIGkFzVDFsFNPJ5lN-NHmI9dQ4O8b8EtoLAvXug1GQ5WkthHTcarTf_lXY5fcoEJbvhObGkUw7LC07jfKn2BTk27bZGx_F2kXNKq2N32CJ_46MMiulhV3sVpuuBUenZ-P7eLMcyMYuz6LcVrybPlrmHBiCnIbgcmgn-jnL-P3rcWL49L8RpPU84Ul4CaOZTFZ7eFCUqa1m1YKjX21YEdJlEm8fyYpFYcFp_9mGziKaxChcel7DevH4J4NV-E1mEUnQP-wDBMVq1IH0wdb4_HSnZ8aBhyyb8GvuEuLIhlH4soY8xtKNlaM73kynXCEhJ2OH-eKM6XIkWQHVIENwRoWzjj8G-8jQcJjz1Clyo9lMuFB98AWfsJgqe_PO7PgIw_Ms8_hRKyGG_aej9UuBo8rS-u4vTGaj5v_1vp6_PrZ-qEp8iyGGK_0OERl5OH0S3_mcXOd1wQcpFQ76RR6qtXqju2G8WkN9e3xC9XvP3SWVDIc5195fVj_1gRGLUCC20Uu5uPC0yzuE2X_TrcjKq0-SeWiyVIphc1T7AoJ2PvAu74js-66UPPcjXqoQvGXCzwrwhPdzXAp8n6sVwGcfRthrk2AOD4U8XJz68aBA5aRx77sqsMKKFIbCRXjRfOcAoa214qR5Oz7-nnKj1dII9Rx_g9ZD7SS_Mjm5Sk3M_Mr0zZNDzN7YWd_j3WhN9Gvr1MOeU6aFKssi2wzLgyNAVHNaXxjKms7cV1bDDwVzfYcHa6L-oLvvPk1FRmoRsD4J_3I7TgE1iO2LOtWD4ZLYilAcmmiHh3OPqNpQrKkl5uK2zg");

                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/accessories", requestOptions);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setStore({ accessories: data });
                } catch (error) {
                    console.error('Error fetching accessories:', error);
                }
            }
            ,

            // getAllFoods: async () =>{
            // const myHeaders = new Headers();
            // myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarcs6pKkdu0hlKHsZshKSYoFOLJxckC2rKyB3dOYiphduuVGauXscSVDHJSbvJgLpRj2KSenjS4loYD-39cHkPc74ABsGZgCtQn9-EXx0NhR2J3RgLlI0MU7rJvY4DY7LwLR6EP0XbFAJSJdWgaDd33sUFSYk6fB04RyCVJJ13afixzEElcyku8FjPfz_OW89kqICedg_yAID42JHYhTFOq7qncpFQInaGXtlu2gGXKutLn5BPpvQ6NVacEefS69g0Hi72czK4MELyopZJwnF2KBkrxxIIjaQgajtf8xarI_uMPqH25RiYW61fZJxcx8uqBP7C71ruU6xns0GWHyYhp0B4PBnxl9WnF22zXcXW79I9pPMERKWwPiR8NtYxSse6CYkGKvDY-ZsRZdS_wOiALQYppvsg-jTDLiLcOZR3idSHjoYy-ZKnscUUOeELRk3IKTWrIews5TdZWyL3QbLh2uDAEjxJ0DrV8TQut2Xh3sd4ls3-HY1HEKs9uJTOsqNzEZDKA5vdr9iPoowd0Uw_qLBeADAtMyxb2IGbVXxeWlIXKxku4ug3i9gv_j2B5bpc3w1DygivsLiFRTdbgh9H54-WIFQ1Y4oUuE_dMIV6gOLTY2ln5JPm7htT4Om8s91j-RQaejkjyzLF17AXIuT3NWRiQDb5sXbKt-Vm97j1kf5O3ypsm2Eq1n-TNHEwccpHmNPoSRLHkRQxaHn4WBBpkR38ocsiICRQAHiztodn5d3ge1YvRq0W2Bwk7yBN-UlpRIHKn6eSGdQmsZUomI7T8mpcByC79Qv8V0Ap22TWXJKQiVFZwGIZWd1ZEz-VPspansl97euPeXeMKo_r9K-hcMmqDO6y0bf2_mPrkQWd2jZaxccTAMH7KIIXC7UcpCa5YUL0pHWpnMprebsvfP0PBXmYZ9kQB2wszruNYXOqy-QSYZkmQfpNymbNpnjEXmVmTtuxxF7t60W01dkf55aep5trg-2ot2jLh9Er2");

            // const requestOptions = {
            // method: "GET",
            // headers: myHeaders,
            // redirect: "follow"
            // };

            // try {
            // const response = await fetch(`${process.env.BACKEND_URL}/api/foods`);
            // const data = await response.json();
            // setStore({ detallesProductos : data });
            // console.log(data)
            // } catch (error) {
            // console.error(error);
            // };
            // }

            getUser: async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) throw new Error("No token found");

                    const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (!response.ok) throw new Error("Error al obtener el usuario");

                    const data = await response.json();
                    setStore({ user: data });

                    // Una vez que tenemos el usuario, obtenemos sus mascotas
                    getActions().getPets(data.id);

                } catch (error) {
                    console.log("Error al obtener usuario", error);
                }
            }
            ,

            getPets: async (userId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/pets`);
                    if (!resp.ok) throw new Error("Error obteniendo mascotas");

                    const allPets = await resp.json();

                    // Filtrar mascotas solo del usuario autenticado
                    const userPets = allPets.filter(pet => pet.user_id === userId);
                    setStore({ pets: userPets });

                } catch (error) {
                    console.log("Error al obtener mascotas", error);
                }
            },





            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({ message: data.message })
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
            // Modificación de la función createOrder en getState
            // createOrder: async (orderData) => {
            //  const myHeaders = new Headers();
            //  myHeaders.append("Content-Type", "application/json");
            //  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

            //  const raw = JSON.stringify(orderData);

            //  const requestOptions = {
            //      method: "POST",
            //      headers: myHeaders,
            //      body: raw,
            //      redirect: "follow",
            //  };

            //  try {
            //      const id = JSON.parse(localStorage.getItem("user")).id;
            //      const response = await fetch(`${process.env.BACKEND_URL}/api/order/${id}`, requestOptions);
            //      const result = await response.json();
            //      console.log(result);
            //      // Manejar respuesta de éxito o error

            //      return result;

            //  } catch (error) {
            //      console.error(error);
            //  }
            // }
            // ,

            createOrder: async (orderData) => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

                const raw = JSON.stringify(orderData);

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                try {
                    const id = JSON.parse(localStorage.getItem("user")).id;
                    const response = await fetch(`${process.env.BACKEND_URL}/api/order/${id}`, requestOptions);

                    if (!response.ok) {
                        throw new Error("Error al crear la orden");
                    }

                    const result = await response.json();
                    console.log("Orden creada exitosamente:", result);

                    // Asegúrate de que el backend devuelva un objeto con `success: true`
                    return { success: true, ...result };
                } catch (error) {
                    console.error("Error al enviar la orden:", error);
                    return { success: false, error: error.message };
                }
            },

            removeFromCart: (productoId) => {
                setStore({
                    cart: store.cart.filter(item => item.id !== productoId),
                });
            }
            ,



            createPet: async (newPet) => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`)
                const raw = JSON.stringify(newPet);

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw
                };

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/pets`, requestOptions);
                    if (!response.ok) {
                        throw new Error(`Error al añadir mascota: ${response.statusText}`);
                    }
                    const result = await response.json();
                    console.log(result);
                    return ({ success: true })
                } catch (error) {
                    console.error(error);
                }
            }
            ,

            // Función para agregar
            addToCart: (item) => {
                const store = getStore(); // Obtiene el estado actual

                if (item) { // Verifica que el item no sea null o undefined
                    setStore({
                        cart: [...store.cart, item], // Añade el producto al carrito
                    });
                } else {
                    console.error("No se puede añadir el producto: el item es inválido.");
                }
            }
            ,

            // Función para eliminar un favorito directamente por su `uid`
            //   removeFavorite: (id) => {
            //  const store = getStore(); // Obtiene el estado actual
            //  setStore({
            //    cart: store.cart.filter((fav) => fav.id !== id), // Filtra y excluye el favorito con el UID dado
            //  });
            //   }
            //   ,


            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({ demo: demo });
            },

            updateUser: async (userData) => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) throw new Error("No token found");

                    const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(userData)
                    });

                    if (!response.ok) {
                        throw new Error("Error al actualizar el usuario");
                    }

                    const updatedUser = await response.json();
                    setStore({ user: updatedUser }); // Actualiza el usuario en el estado global
                    alert("Perfil actualizado con éxito");

                } catch (error) {
                    console.error("Error al actualizar usuario:", error);
                    alert("Hubo un error al actualizar el perfil.");
                }
            },

            deleteUser: async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) throw new Error("No token found");

                    const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error("Error al eliminar la cuenta");
                    }

                    localStorage.removeItem("token"); // Elimina el token de autenticación
                    setStore({ user: null, token: null }); // Borra el usuario del estado global
                    alert("Cuenta eliminada correctamente");

                    window.location.href = "/"; // Redirige a la página de inicio o login

                } catch (error) {
                    console.error("Error al eliminar usuario:", error);
                    alert("Hubo un error al eliminar la cuenta.");
                }
            }


        }
    };
};

export default getState;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "",
			users: [],
			doctors: [],
			user: null,
			token: localStorage.getItem('token') || null,
			doctor: null,
			admin: null,
		},
		actions: {


			// login de admin funcionando!
			logInAdmin: async (name, email, password) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				console.log("esta es la base URL", baseURL)
				try {
					console.log("DATOS DE ENVIO", 	name, email, password)
					const response = await fetch(`${baseURL}api/logIn/admin`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ name, email, password }),
					});

					if (!response.ok) {
						console.log("primera parada")
						const errorData = await response.json();
						throw new Error(errorData.error || 'Error en el inicio de sesión');
					}

					const data = await response.json();

					let store = getStore()
					setStore({ ...store, admin: { name, email }, token: data.access_token, message: 'Inicio de sesión exitoso' });

					localStorage.setItem('token', data.access_token);
					localStorage.setItem('name', data.name);
					localStorage.setItem('email', data.email);
				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					setStore({ message: error.message });
				}
			},

			// login de doctores funcionando
			logInDoc: async (name, email, password) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				try {
					const response = await fetch(`${baseURL}api/logIn/doctor`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ name, email, password }),

					});
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || 'Error en el inicio de sesión');
					}

					const data = await response.json(); 
					let store = getStore()
					setStore({ ...store, doctor: { name, email }, token: data.access_token, message: 'Inicio de sesión exitoso' });
					localStorage.setItem('token', data.access_token);
					localStorage.setItem('name', data.name);
					localStorage.setItem('email', data.email);
					localStorage.setItem('id', data.id);
				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					setStore({ message: error.message });
				}
			},

			// login de usuario
			logIn: async (name, email, password) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				console.log("ESTA ES LA BASE URL", baseURL)
				try {
					console.log('DATOS DE ENVIO', name, email, password)
					const response = await fetch(`${baseURL}api/logIn`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ name, email, password }),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || 'Error en el inicio de sesión');
					}

					const data = await response.json();
					let store = getStore()
					setStore({ ...store, user: { name, email }, token: data.access_token, message: 'Inicio de sesión exitoso' });
					localStorage.setItem('token', data.access_token);
					localStorage.setItem('user', JSON.stringify(data.user));
					localStorage.setItem('name', data.name);
					localStorage.setItem('email', data.email);
					localStorage.setItem('id', data.id); 

				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					setStore({ message: error.message });
				}
			},

			// revisar el password
			// Registro de pacientes
			RegistroPacientes: async (name, email, password) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				try {
					const token = getStore().token;

					const response = await fetch(`${baseURL}api/user`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
						body: JSON.stringify({ name, email, password }),
					});

					if (!response.ok) {
						let errorMessage = 'Error desconocido';
						try {
							const errorData = await response.json();
							errorMessage = errorData.error || errorData.message || 'Error en la solicitud';
						} catch (err) {
							errorMessage = 'Error al procesar la respuesta del servidor';
							console.log('Datos del paciente:', data);
						}
						throw new Error(errorMessage);
					}

					const data = await response.json();
					setStore({ user: { name, email, password }, users: [...getStore().users, { name, email, password }], token: data.access_token, message: 'Paciente registrado exitosamente' });
					localStorage.setItem('token', data.access_token);
					console.log("usuario creado", data)

				} catch (error) {
					console.error('Error al registrar paciente:', error);
					setStore({ message: error.message });
				}
			},

			deleteUser: async (idUser) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				idUser = idUser || getStore().user?.id || localStorage.getItem('id');

				if (!idUser) {
					console.error("Id usuario invalido:", idUser)
					return;
				}

				try {
					const token = getStore().token

					const response = await fetch(`${baseURL}api/delete_user/${idUser}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					})
					if (!response.ok) {

						const errorData = await response.json()
						throw new Error(errorData.error || "no se elimino el Usuario correctamente")
					}
					console.log("Usuario Eliminado Correctamente")

					const store = getStore();
					if (Array.isArray(store.users)) {

						setStore({ users: [...store.users.filter(user => user.id !== idUser)] })
					}
					if (store.user && store.user.id === idUser) {
						localStorage.removeItem("token")
						setStore({ user: null, token: null })
					}



				} catch (error) {
					console.error("error al eliminar usuario")
				}

			},

			deleteDoctor: async (idDoctor) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				idDoctor = idDoctor || getStore().doctor?.id || localStorage.getItem('id');
				if (!idDoctor) {
					console.error("Id usuario invalido:", idDoctor)
					return;
				}

				try {
					const token = getStore().token
					const response = await fetch(`${baseURL}api/delete_doctor/${idDoctor}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					})
					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "no se elimino el Doctor correctamente")
					}
					const store = getStore();
					console.log(" se Elimino el usuario del Doctor correctamente")
					if (Array.isArray(store.doctors)) {

						setStore({ doctors: [...store.doctors.filter(doctor => doctor.id !== idDoctor)] })
					}
					if (store.doctor && store.doctor.id === idDoctor) {
						localStorage.removeItem("token")
						setStore({ doctor: null, token: null })
					}

				} catch (error) {
					console.error("error al eliminar dooctor:", error)

				}
			},

			editUser: async (userBody, userid) => {
				const baseURL = process.env.REACT_APP_BASE_URL;

				try {
					const actions = getActions();
					const token = getStore().token
					const response = await fetch(`${baseURL}api/edit_user/${userid}`, {
						method: "PUT",
						body: JSON.stringify(userBody),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						}
					})
					console.log(response)
					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "No se pudo editar el usuario")

					}
					console.log("El usuario se edito correctamente")

					actions.logIn(name, email, password);

					return true


				} catch (error) {
					console.log("error al editar el usuario", error)
				}
			},


			editDoctor: async (docBody, docId) => {
				const baseURL = process.env.REACT_APP_BASE_URL;

				try {
					const actions = getActions();
					const token = getStore().token
					const response = await fetch(`${baseURL}api/edit_doctor/${docId}`, {
						method: "PUT",
						body: JSON.stringify(docBody),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						}
					})
					console.log(response)
					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Error al editar usuario del Doctor")
					}
					console.log("El usuario de Doctor se edito correctamente")
					
					localStorage.setItem('name', docBody.name);
					localStorage.setItem('email', docBody.email);

					setStore({
						doctor: {
							...getStore().doctor,
							name: docBody.name,
							email: docBody.email
						}
					});

					actions.logInDoc(docBody.name, docBody.email, docBody.password);
					return true

				} catch (error) {
					console.log("error al editar el usuario de Doctor", error)
				}
			},


			// agregar doctores esta funcionando
			AddDoctor: async (name, email, specialty, password) => {
				const baseURL = process.env.REACT_APP_BASE_URL;
				try {
					const token = getStore().token;

					const response = await fetch(`${baseURL}api/doctors`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
						body: JSON.stringify({ name, email, specialty, password }),
					});

					if (!response.ok) {
						let errorMessage = 'Error desconocido';
						try {
							const errorData = await response.json();
							errorMessage = errorData.error || errorData.message || 'Error en la solicitud';
						} catch (err) {
							errorMessage = 'Error al procesar la respuesta del servidor';
							console.log('Datos del paciente:', data);
						}
						throw new Error(errorMessage);
					}

					const data = await response.json();
					setStore({ doctor: { name, email, specialty }, token: data.access_token, message: 'Doctor registrado exitosamente' });
					localStorage.setItem('token', data.access_token);

				} catch (error) {
					console.error('Error al registrar doctor:', error);
					setStore({ message: error.message });
				}
			},
			// doctorsGet: async () => {
			// 	const baseURL = process.env.REACT_APP_BASE_URL;
				
			// 	try {
			// 		let response = await fetch(`${baseURL}api/doctors`)
			// 		if (!response.ok) {//si algo es diferente del .ok entonces tire un nuevo error
			// 			throw new Error("Error en Doctors!");
			// 		}
			// 		let data = await response.json();  //llamamos data y lo traducimos a json
			// 		let store = getStore() //llamamos la funcion getstore
			// 		setStore({ ...store, doctor: data })//le decimos que store que tiene  getstore, traiga el array personajes, y sea reamplazado con data. result la propiedad del link



			// 	} catch (error) {
			// 		console.error(error);
			// 	}

			// }
			doctorsGet: async () => {
				const baseURL = process.env.REACT_APP_BASE_URL;
			
				try {
					let response = await fetch("https://fuzzy-fortnight-r4ppq7gg65vxhr64-3001.app.github.dev/api/doctors");
					
					if (!response.ok) {
						// Si la respuesta no es correcta, mostrar el texto de respuesta
						let errorText = await response.text();
						throw new Error(`Error en Doctors: ${errorText}`);
					}
			
					let data = await response.json();  // Convertimos la respuesta a JSON
					let store = getStore(); // Obtenemos el estado actual del store
			
					setStore({ ...store, doctor: data }); // Guardamos la lista de doctores en el store
			
				} catch (error) {
					console.error("Error obteniendo doctores:", error);
				}
			},

		},
	};
};

export default getState;

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "",
			user: null, 
			users:[], 
			doctors:[],
			token: localStorage.getItem('token') || null, 
			doctor: null,
			admin: null,
		},
		actions: {
			// login de admin funcionando!
			logInAdmin: async (name, email, password) => {
				try {
					const response = await fetch('https://orange-fortnight-q7p96qjp95v5c9gvx-3001.app.github.dev/api/logIn/admin', {
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
					setStore({ admin: { name, email }, token: data.access_token, message: 'Inicio de sesión exitoso' });
					localStorage.setItem('token', data.access_token);
				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					setStore({ message: error.message });
				}
			},

			// login de doctores funcionando
			logInDoc: async (name, email, password) => {
				try {
					const response = await fetch('https://orange-fortnight-q7p96qjp95v5c9gvx-3001.app.github.dev/api/logIn/doctor', {
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
					setStore({ doctor: { name, email }, token: data.access_token, message: 'Inicio de sesión exitoso' });
					localStorage.setItem('token', data.access_token);
				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					setStore({ message: error.message });
				}
			},

			// login de usuario
			logIn: async (name, email, password) => {
				try {
					const response = await fetch('https://studious-acorn-v6qgwv9qg5vr269x-3001.app.github.dev/api/logIn', {
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
					setStore({ user: { name, email }, token: data.access_token, message: 'Inicio de sesión exitoso' });
					localStorage.setItem('token', data.access_token);
					console.log ("iniciosesion", data)
				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					setStore({ message: error.message });
				}
			},

			// Registro de pacientes
			RegistroPacientes: async (name, email, password) => {
				try {
					const token = getStore().token;
					// if (!token) {
					// 	throw new Error('No hay token disponible');
					// }

					const response = await fetch('https://bug-free-space-enigma-97jjr6995455fq-3001.app.github.dev/api/user', {
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
					setStore({ user: { name, email, password },users:[...getStore().users,{name,email,password}], token: data.access_token, message: 'Paciente registrado exitosamente' });
					localStorage.setItem('token', data.access_token);
					console.log ("usuariocreado", data)
				} catch (error) {
					console.error('Error al registrar paciente:', error);
					setStore({ message: error.message });
				}
			}, 
			deleteUser: async(idUser)=>{ 
				try{  
					const token= getStore().token
					const response=await fetch(`https://psychic-xylophone-6949wqj5prjpcr7g4-3001.app.github.dev/api/delete_user/${idUser}`,{ 
						method:'DELETE', 
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`, 
						}, 
					}) 
					if(!response.ok){  
						const errorData=await response.json()
						throw new Error(errorData.error || "no se elimino el Usuario correctamente")
					}  
					console.log("Usuario Eliminado Correctamente")
					
					const store= getStore(); 
					if(Array.isArray(store.users)){ 
						const updateUser=store.users.filter(user=>user.id !== idUser) 
						setStore({users:updateUser})
					} 
					if(store.user && store.user.id === idUser){ 
						localStorage.removeItem("token") 
						setStore({user: null, token:null})
					}
				


				}catch (error){ 
					console.error("error al eliminar usuario") 	
				} 

			}, 
			deleteDoctor: async(idDoctor)=>{ 
				try{ 
					const token= getStore().token  
					const response = await fetch(`https://psychic-xylophone-6949wqj5prjpcr7g4-3001.app.github.dev/api/delete_doctor/${idDoctor}`,{ 
						method:'DELETE', 
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`, 
						}, 
					}) 
					if(!response.ok){  
						const errorData=await response.json()
						throw new Error(errorData.error || "no se elimino el Doctor correctamente")
					}  
					const store=getStore();
					console.log(" se Elimino el usuario del Doctor correctamente") 
					if(Array.isArray(store.doctors)){ 
						const updateDoctor= store.doctors.filter(doctor=>doctor.id !== idDoctor) 
						setStore({doctors:updateDoctor})
					} 
					if(store.doctor && store.doctor.id === idDoctor ){ 
						localStorage.removeItem("token") 
						setStore({doctor:null,token:null})
					}

				}catch(error){ 
					console.error("error al eliminar dooctor:", error) 

				}
			}, editUser: async(userBody, userid)=>{ 
				try{  
					const actions=getActions();  
					const token=getStore().token 
					const response= await fetch(`https://psychic-xylophone-6949wqj5prjpcr7g4-3001.app.github.dev/api/edit_user/${userid}`,{ 
						method:"PUT",  
						body:JSON.stringify(userBody),
						headers:{ 
							'Content-Type':'application/json', 
							'Authorization':`Bearer ${token}`,
						}
					})  
					console.log(response)
					if(!response.ok){  
                          const errorData= await request.json() 
						  throw new Error (errorData.error || "No se pudo editar el usuario")
						 
					}
						console.log("El usuario se edito correctamente") 
            			actions.logIn();
						return true

				}catch(error){ 
					console.log("error al editar el usuario",error)
				}
			},
			editDoctor: async(docBody, docid)=>{ 
				try{  
					const actions=getActions();  
					const token=getStore().token 
					const response= await fetch(`https://psychic-xylophone-6949wqj5prjpcr7g4-3001.app.github.dev/api/edit_doctor/${docid}`,{ 
						method:"PUT",  
						body:JSON.stringify(docBody),
						headers:{ 
							'Content-Type':'application/json', 
							'Authorization':`Bearer ${token}`,
						}
					})  
					console.log(response)
					if(!response.ok){  
						const errorData= await response.json() 
						throw new Error(errorData.error || "Error al editar usuario del Doctor")
					}						 
						console.log("El usuario de Doctor se edito correctamente") 

						actions.logInDoc(); 
						return true         

				}catch(error){ 
					console.log("error al editar el usuario de Doctor",error)
				}
			},

		},
	};
};

export default getState;

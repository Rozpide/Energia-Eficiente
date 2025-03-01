const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "",
			user: null,
			token: null || localStorage.getItem('token') , 
			doctor: null,
			admin: null,
		},
		actions: {
			// login de admin funcionando!
			logInAdmin: async (name, email, password) => {
				try {
					const response = await fetch('https://psychic-garbanzo-5gx45qjx45wj24wg-3001.app.github.dev/api/logIn/admin', {
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
					console.log("esta e sla data", data)
					localStorage.setItem('token', data.access_token);
				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					setStore({ message: error.message });
				}
			},

			// login de doctores funcionando
			logInDoc: async (name, email, password) => {
				try {
					const response = await fetch('https://psychic-garbanzo-5gx45qjx45wj24wg-3001.app.github.dev/api/logIn/doctor', {
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
					const response = await fetch('https://psychic-garbanzo-5gx45qjx45wj24wg-3001.app.github.dev/api/logIn', {
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
					console.log ("inicio de sesion", data)
				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					setStore({ message: error.message });
				}
			},

			// revisar el password
			// Registro de pacientes
			RegistroPacientes: async (name, email, password) => {
				try {
					const token = getStore().token;

					const response = await fetch('https://psychic-garbanzo-5gx45qjx45wj24wg-3001.app.github.dev/api/user', {
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
					setStore({ user: { name, email, password }, token: data.access_token, message: 'Paciente registrado exitosamente' });
					localStorage.setItem('token', data.access_token);
					console.log ("usuariocreado", data)
				} catch (error) {
					console.error('Error al registrar paciente:', error);
					setStore({ message: error.message });
				}
			},

			AddDoctor: async (name, email, specialty, password) => {
				try {
					const token = getStore().token;

					const response = await fetch('https://psychic-garbanzo-5gx45qjx45wj24wg-3001.app.github.dev/api/doctors', {
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
		},
	};
};

export default getState;

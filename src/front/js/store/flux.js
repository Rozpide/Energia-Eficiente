const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "",
			user: null,
			token: null,
			doctor: null,

		},
		actions: {
			logInDoc: async (name, email, password) => {
				try {
					const response = await fetch('https://studious-acorn-v6qgwv9qg5vr269x-3001.app.github.dev/api/logIn/doctor', {
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
					setStore({ message: error.message }); // Actualizar el mensaje de error en el store
				}
			},

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
				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					setStore({ message: error.message }); // Actualizar el mensaje de error en el store
				}
			},

			logOut: () => {
				setStore({ user: null, message: 'Has cerrado sesión' });
				localStorage.removeItem('token'); // Eliminar el token del almacenamiento
			},
			RegistroPacientes: async (name, age, email) => {
				try {
					const response = await fetch('https://studious-acorn-v6qgwv9qg5vr269x-3001.app.github.dev/api/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + getStore().token,
						},
						body: JSON.stringify({ name, age, email }),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || 'Error al registrar el paciente');
					}

					const data = await response.json();
					setStore({ message: 'Paciente registrado exitosamente' });
				} catch (error) {
					console.error('Error al registrar paciente:', error);
					setStore({ message: error.message }); // Actualizar el mensaje de error en el store //porqué vergas no me sale!!
				}
			},
		},
	},
};

export default getState;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "",
			user: null,
			token: null,
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
						body: JSON.stringify({name, email, password}),
					});
			
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || 'Error en el inicio de sesión');
					}
			
					const data = await response.json();
					setStore({ admin: {name, email }, token: data.access_token, message: 'Inicio de sesión exitoso' });
					localStorage.setItem('token', data.access_token);
				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					setStore({ message: error.message }); // Actualizar el mensaje de error en el store
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
						body: JSON.stringify({name, email, password}),
					});
			
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || 'Error en el inicio de sesión');
					}
			
					const data = await response.json();
					setStore({ doctor: {name, email }, token: data.access_token, message: 'Inicio de sesión exitoso' });
					localStorage.setItem('token', data.access_token);
				} catch (error) {
					console.error('Error al iniciar sesión:', error);
					setStore({ message: error.message }); // Actualizar el mensaje de error en el store
				}
			},


			// login de user ya funciona!
			logIn: async (name, email, password) => {
				try {
					const response = await fetch('https://orange-fortnight-q7p96qjp95v5c9gvx-3001.app.github.dev/api/logIn', {
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
		},
	};
};

export default getState;

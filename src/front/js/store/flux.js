const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: null,
			token: null,
		},
		actions: {
			logIn: async (name, email, password) => {
				try {
					const response = await fetch('https://studious-acorn-v6qgwv9qg5vr269x-3001.app.github.dev/api/logIn',
						{
							method: 'POST',
							header: {
								'Content-Type': 'aplication/json',
							},
							body: JSON.stringify({ name, email, password }),
						});
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || 'Error en el inicio de sesion');
					}

					const data = await response.json();
					setStore({ user: { name, email }, token: data.acces_token, message: 'Has iniciado sesión' });
					console.log('data', data);

				} catch (error) {
					console.error('error al iniciar sesion', error)
				}
			},

			logOut: () => {
				// Función para cerrar sesión
				setStore({ user: null, message: 'Has cerrado sesión' });
				localStorage.removeItem('token'); // Eliminar el token del almacenamiento
			},
		},
	};
};

export default getState;

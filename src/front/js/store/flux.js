const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: "",
			user: null,
			token: null,
		},
		actions: {
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
		},
	};
};

export default getState;

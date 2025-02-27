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


            RegistroPacientes: async (name, age, email) => {
                try {
                    const token = getStore().token;
                    if (!token) {
                        throw new Error('No hay token disponible, por favor inicia sesión.');
                    }

                    const response = await fetch('https://studious-acorn-v6qgwv9qg5vr269x-3001.app.github.dev/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ name, age, email }),
                    });

                    if (!response.ok) {
                        let errorMessage = 'Error desconocido';
                        try {
                            const errorData = await response.json();
                            errorMessage = errorData.error || errorData.message || 'Error en la solicitud';
                        } catch (err) {
                            errorMessage = 'Error al procesar la respuesta del servidor';
                        }
                        throw new Error(errorMessage);
                    }

                    setStore({ message: 'Paciente registrado exitosamente' });
                } catch (error) {
                    console.error('Error al registrar paciente:', error);
                    setStore({ message: error.message });
                }
            },
        },
    };
};

export default getState;
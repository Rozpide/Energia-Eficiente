const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			logged: false,
			user: "",
			auth: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
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
			login: async (email, password) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify({
					"email": email,
					"password": password
				});

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, requestOptions);
					const result = await response.json();
					if (response.status === 200) {
						localStorage.setItem("token", result.access_token)
						setStore({ logged: true })
						getActions().verifyToken()
						getActions().getPrivate()
					} else if (response.status === 404 || response.status === 401) {
						setStore({ logged: false })
					}
				} catch (error) {
					console.error(error);
					return false;
				};
			},
			getPrivate: async () => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/private`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						},
					});
					const result = await response.json();
					setStore({ user: result.logged_in_as })

				} catch (error) {
					console.error(error);
				};
			},
			verifyToken: async () => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/verify-token`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						},
					});
					const result = await response.json();
					setStore({ auth: result.valid })
				} catch (error) {
					console.error(error);
				};
			},
			logout: () => {
				//borrar el token del localStorage
				localStorage.removeItem("token")
				setStore({ logged: false })
				getActions().verifyToken()
			},
		}
	};
};

export default getState;

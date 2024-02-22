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
            auth: false
        },
        actions: {
            login: async (email, password) => {

				try {
					let response = await fetch("https://shiny-dollop-qgq7xr79pxg24747-3001.app.github.dev/api/login", {
						method:"POST",
						headers: {
							"Content-type":"application/json"
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					});

					let data = await response.json();
					localStorage.setItem("token",data);
						return true;
				} catch (error) {
					console.log(error);
						return false;
				}
            },

            validate_token: async () => {
                let token = localStorage.getItem("token")
                if(token){
                    try {
					let response = await fetch("https://cuddly-zebra-g4qj5prwrp5whwvvj-3001.app.github.dev/api/validate_token", {
					    headers: {
						    'Content-Type': 'application/json',
						    'Authorization': `Bearer ${token}`
					    }
				    });
                    if (response.status>=200 && response.status<300){
                        setStore({ auth: true})
                    }
                    else{
                        setStore({ auth: false});
                        localStorage.removeItem("token");
                    }
				    } catch (error) {
					console.log(error);
				    }
                }
				
            }
        }
    };
};
export default getState;
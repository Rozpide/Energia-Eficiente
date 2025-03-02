const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			},
		}
	};
};

export default getState;

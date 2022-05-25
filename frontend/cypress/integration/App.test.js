import React from "react";
import { mount } from "@cypress/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";
import { Provider } from "react-redux";
import store from "./state";

/**
 * TEST END TO END POUR LE MONTAGE DES ROUTES DE LAPPLICATION
 */
it("renders App link", () => {
	mount(
		<Provider store={store}>
			<App />
		</Provider>,
		{ wrapper: MemoryRouter }
	);
});

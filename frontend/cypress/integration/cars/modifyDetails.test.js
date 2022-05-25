import { mount } from "@cypress/react"; // or @cypress/vue
import ModifyDetails from "../../../src/components/cars/modifyDetails";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store, { preloadedState, carsImages } from "../state";

/**
 * TEST END TO END POUR LA PAGE CAR DETAIL DE LAPPLICATION
 */

describe("TodoList", () => {
	it("renders the Home page", () => {
		const history = createBrowserHistory();
		history.push("/modifyDetails", {
			from: {
				key: preloadedState.carState.cars[0].id,
				car: preloadedState.carState.cars[0],
				images: carsImages[preloadedState.carState.cars[0].id],
			},
		});
		mount(
			<Provider store={store}>
				<Router location={history.location} navigator={history}>
					<ModifyDetails />
				</Router>
			</Provider>
		);
		cy.contains(/Marque/i).should("be.visible");
		cy.contains(/Prix/i).should("be.visible");
	});
});

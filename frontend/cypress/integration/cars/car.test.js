import { mount } from "@cypress/react"; // or @cypress/vue
import { MemoryRouter } from "react-router-dom";
import Cars from "../../../src/components/cars/cars";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../state";

/**
 * TEST END TO END POUR LA PAGE CARS DE LAPPLICATION
 */
describe("TodoList", () => {
	it("renders the Home page", () => {
		const history = createMemoryHistory();
		history.push("/cars");
		mount(
			<Provider store={store}>
				<Router location={history.location} navigator={history}>
					<Cars />
				</Router>
			</Provider>,
			{ wrapper: MemoryRouter }
		);
		cy.contains(/Audi RS 3/i).should("be.visible");
		cy.contains(/Type/i).should("be.visible");
		cy.contains(/Marque et modèle/i).should("be.visible");
	});
});

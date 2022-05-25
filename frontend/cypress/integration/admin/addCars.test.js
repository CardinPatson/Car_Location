import { mount } from "@cypress/react"; // or @cypress/vue
import { MemoryRouter } from "react-router-dom";
import AddCars from "../../../src/components/admin/addCars";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../state";

/**
 * TEST END TO END POUR LA PAGE ADDCARS DE LAPPLICATION
 */
describe("TodoList", () => {
	it("renders the AddCars page", () => {
		const history = createMemoryHistory();
		history.push("/add-cars");
		mount(
			<Provider store={store}>
				<Router location={history.location} navigator={history}>
					<AddCars />
				</Router>
			</Provider>,
			{ wrapper: MemoryRouter }
		);
		cy.contains(/Nom/i).should("be.visible");
		cy.contains(/Marque/i).should("be.visible");
		cy.contains(/Modèle/i).should("be.visible");
		cy.contains(/Ajouter une voiture/i).should("be.visible");
	});
});

import { mount } from "@cypress/react"; // or @cypress/vue
import { MemoryRouter } from "react-router-dom";
import Connreg from "../../../src/components/connection/connreg";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../state";

/**
 * TEST END TO END POUR LA PAGE CARS DE LAPPLICATION
 */
describe("TodoList", () => {
	it("renders the Connexion page", () => {
		const history = createMemoryHistory();
		history.push("/connreg");
		mount(
			<Provider store={store}>
				<Router location={history.location} navigator={history}>
					<Connreg />
				</Router>
			</Provider>,
			{ wrapper: MemoryRouter }
		);
		cy.contains(/Email/i).should("be.visible");
		cy.contains(/Mot de passe/i).should("be.visible");
		cy.contains(/Se connecter/i).should("be.visible");
		cy.contains(/Se connecter avec google/i).should("be.visible");
	});
});

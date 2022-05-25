import { mount } from "@cypress/react"; // or @cypress/vue
import { MemoryRouter } from "react-router-dom";
import Home from "../../src/components/home";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import stores from "./state";

const store = stores;

/**
 * TEST END TO END POUR LA PAGE HOME DE LAPPLICATION
 */
describe("TodoList", () => {
	it("renders the Home page", () => {
		const history = createMemoryHistory();
		history.push("/");
		mount(
			<Provider store={store}>
				<Router location={history.location} navigator={history}>
					<Home />
				</Router>
			</Provider>,
			{ wrapper: MemoryRouter }
		);
		cy.contains(/Choisissez une date/i).should("be.visible");
	});
});

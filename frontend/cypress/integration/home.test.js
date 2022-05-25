import { mount } from "@cypress/react"; // or @cypress/vue
import { MemoryRouter } from "react-router-dom";
import Home from "../../src/components/home";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import stores from "./state";

//CONTACTER LA BASE DE DONNEES POUR RECUPERER TOUTES LES VOITURES
const store = stores;
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
		// cy.get("[data-testid=todo-list]").should("exist");
	});

	// it("contains the correct number of todos", () => {
	// 	const todos = [
	// 		{ text: "Buy milk", id: 1 },
	// 		{ text: "Learn Component Testing", id: 2 },
	// 	];

	// 	mount(<TodoList todos={todos} />);

	// 	cy.get("[data-testid=todos]").should("have.length", todos.length);
	// });
});

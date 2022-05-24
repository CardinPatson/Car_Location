import { mount } from "@cypress/react"; // or @cypress/vue
import { MemoryRouter } from "react-router-dom";
import AddCars from "../../../src/components/admin/addCars";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../state";

describe("TodoList", () => {
	it("renders the AddCars page", () => {
		const history = createMemoryHistory();
		history.push("/cars");
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

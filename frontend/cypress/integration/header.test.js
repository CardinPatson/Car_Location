import { mount } from "@cypress/react"; // or @cypress/vue
import { MemoryRouter } from "react-router-dom";
import Header from "../../src/components/header";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state";

describe("TodoList", () => {
	it("renders the Home page", () => {
		const history = createMemoryHistory();
		history.push("/");
		mount(
			<Provider store={store}>
				<Router location={history.location} navigator={history}>
					<Header />
				</Router>
			</Provider>,
			{ wrapper: MemoryRouter }
		);
		// cy.contains(/Choisissez une date/i).should("be.visible");
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

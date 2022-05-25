import { mount } from "@cypress/react"; // or @cypress/vue
import ModifyDetails from "../../../src/components/cars/modifyDetails";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store, { preloadedState } from "../state";

let carsImages = {};
if (preloadedState.carState.images && preloadedState.carState.images.length) {
	for (let image of preloadedState.carState.images) {
		if (image.car_id) carsImages[image.car_id] = image.file_names;
	}
}

describe("TodoList", () => {
	it("renders the Home page", () => {
		const history = createBrowserHistory();
		// history.push("/modifyDetails");
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
			// { wrapper: MemoryRouter }
		);
		cy.contains(/Marque/i).should("be.visible");
		cy.contains(/Prix/i).should("be.visible");
		// cy.contains(/Marque et modèle/i).should("be.visible");
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

// this.props.history.push({
// 	pathname: "/template",
// 	search: "?query=abc",
// 	state: { detail: response.data },
// });

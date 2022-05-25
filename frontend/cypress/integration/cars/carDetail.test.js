import { mount } from "@cypress/react"; // or @cypress/vue
import { MemoryRouter } from "react-router-dom";
import CarsDetail from "../../../src/components/cars/carDetails";
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
		history.push("/carDetails", {
			from: {
				key: preloadedState.carState.cars[0].id,
				car: preloadedState.carState.cars[0],
				images: carsImages[preloadedState.carState.cars[0].id],
			},
		});
		mount(
			<Provider store={store}>
				<Router location={history.location} navigator={history}>
					<CarsDetail />
				</Router>
			</Provider>
		);
	});
});

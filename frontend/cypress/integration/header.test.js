import { mount } from "@cypress/react"; // or @cypress/vue
import { MemoryRouter } from "react-router-dom";
import Header from "../../src/components/header";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state";

/**
 * TEST END TO END POUR LE HEADER DE LAPPLICATION
 */
describe("TodoList", () => {
	it("renders the header", () => {
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
	});
});

import React from "react";
import { mount } from "@cypress/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";
import { Provider } from "react-redux";
import store from "./state";

it("renders App link", () => {
	mount(
		<Provider store={store}>
			<App />
		</Provider>,
		{ wrapper: MemoryRouter }
	);
	// cy.get("/");
	// cy.contains(/Choisissez une date/i).should("be.visible");
	
});
// describe("LOAD OK", function () {
// 	it("should load without crashing", function () {
// 		cy.visit("http://localhost:8081");
// 	});
// });
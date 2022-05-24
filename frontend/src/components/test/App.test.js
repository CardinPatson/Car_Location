import React from "react";
import { mount } from "@cypress/react";
import App from "../../App"; 
// cypress/integration/spec.js
// it("loads", () => {
// 	cy.visit("/");
// 	// cy.focused()
// 	// 	.should("have.class", "new-todo")
// 	// 	.and("have.attr", "placeholder", "What needs to be done?");
// 	// cy.get(".todo-list li").should("have.length", 1).contains("Use Redux");
// });

it("renders learn react link", () => {
	mount(<App />);
	cy.get("a").contains("");
});

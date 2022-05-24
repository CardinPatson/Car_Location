// cypress/integration/spec.js
it("loads", () => {
	cy.visit("http://172.17.16.1:3000");
	cy.focused()
		.should("have.class", "new-todo")
	// 	.and("have.attr", "placeholder", "What needs to be done?");
	// cy.get(".todo-list li").should("have.length", 1).contains("Use Redux");
});

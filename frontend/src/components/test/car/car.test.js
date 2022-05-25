import React from "react";
import Cars from "../../cars/cars";
import { render, screen, act } from "../test-utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";



// TEST DINTEGRATION POUR LA PAGE CARS
test("Get Cars", async () => {
	const history = createMemoryHistory();
	history.push("/cars");

	render(
		<Router location={history.location} navigator={history}>
			<Cars />
		</Router>
	);

	const clickHandler = jest.fn((evt) => {
		// evenement qui va simuler le click
		evt.preventDefault();
		evt.stopPropagation();
		history.push("/carDetail");
	});

	//Bind the simulated click event function to the button
	screen.getByText("Détails").onclick = (evt) => clickHandler(evt);

	//Expect on page
	expect(await screen.findByText("Voitures disponibles")).toBeTruthy();
	expect(await screen.findAllByText("Type")).toBeTruthy();
	expect(await screen.findAllByText("Places")).toBeTruthy();
	act(() => {
		userEvent.click(screen.getByRole("button", { name: "Détails" }));
	});
	//verifier si le click est appelé
	expect(clickHandler).toHaveBeenCalled();
	expect(history.location.pathname).toBe("/carDetail");
});

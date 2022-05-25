import React from "react";
import AddCars from "../../admin/addCars";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { render, screen } from "../test-utils";

test("Get Legend", async () => {
	const history = createMemoryHistory();
	history.push("/cars");
	render(
		<Router location={history.location} navigator={history}>
			<AddCars />
		</Router>
	);
	// const linkElement = screen.getAllByText("Ajouter une voiture");
	// expect(linkElement).toBeInTheDocument();
	expect(await screen.findByText("Ajouter une voiture")).toBeTruthy();
	expect(await screen.findByText("Nom")).toBeTruthy();
	expect(await screen.findByText("Marque")).toBeTruthy();
	expect(await screen.findByText("Modèle")).toBeTruthy();
	// expect(await screen.findAllByRole("button")).toBeDisabled();
});

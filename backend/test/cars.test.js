const server = require("../app");
const cars = require("../database/models/cars");
const chai = require("chai");
const request = require("supertest");
const { omit } = require("lodash");

const { expect } = chai;
/**
 * TEST D'INTEGRATION POUR LES ROUTES CARS
 */
const shouldAddCars = {
	name: "okooo",
	price: 500,
	brand: "mercedes",
	model: "1996",
	color: "okooo",
	doors: 5,
	bootSize: 140,
	type: "SUV",
	energy: "Essence",
	isAutomatic: true,
	isAvailable: true,
	passengers: 5,
	airConditioning: true,
	description: "okooo est une belle voiture",
};

const shouldGetCars = {
	id: 3,
	name: "okooo",
	price: 500,
	brand_id: 2,
	color: "okooo",
	doors: 5,
	boot_size: 140,
	type: "SUV",
	energy: "Essence",
	is_automatic: true,
	air_conditioning: true,
	is_available: true,
	passengers: 5,
	description: "okooo est une belle voiture",
	number_plate: null,
	year: null,
	mileage: null,
	cars_brands: { id: 2, brand: "mercedes", model: "1996" },
};

const shouldGetCarsImages = {
	id: 1,
	car_id: 1,
	file_names: ["imagesblabla.jpg", "ramadan.jpg"],
};

describe("POST /api/cars", async () => {
	//CAS OU ON AJOUTE DES VOITURES
	it("Should add car", async () => {
		const response = await request(server)
			.post("/api/cars/")
			.send(shouldAddCars);
		expect(response.status).to.equal(201);
	});
});

describe("GET /api/cars", async () => {
	//CAS OU ON RECUPERE TOUTES LES VOITURES
	it("Should return all cars", async () => {
		const response = await request(server).get("/api/cars/");
		expect(response.status).to.equal(200);
		expect(response.redirect).to.equal(false);
		expect(response.body).to.deep.include(shouldGetCars);

		for (let i = 0; i < response.body.length; i++) {
			let object = response.body[i];
			expect(object["name"]).not.be.undefined;
			expect(object["price"]).not.be.undefined;
			expect(object["brand_id"]).not.be.undefined;
			expect(object["is_automatic"]).not.be.undefined;
			expect(object["Aymar"]).to.be.undefined;
		}
	});
});
describe("GET /api/cars/images", async () => {
	//CAS OU ON RECUPERE TOUTES LES IMAGES DES VOITURES
	it("Should return all cars images", async () => {
		const response = await request(server).get(`/api/cars/images`);
		expect(response.status).to.equal(200);
		expect(response.body).to.deep.include(shouldGetCarsImages);
	});
	it("Should fail to return all cars images", async () => {
		const response = await request(server).get(`/api/cars/images`);
		expect(response.status).to.equal(200);
		expect(response.body).to.deep.include(shouldGetCarsImages);
	});
});

describe("PUT /api/cars", async () => {
	//CAS OU ON MODIFIE LES INFOS DUNE VOITURE
	const shouldModifyCars = {
		newName: "RS3 Gris",
		newPrice: 500,
		newBrand: "mercedes",
		newModel: "1996",
		newColor: "rouge",
		newDoors: 5,
		newBootSize: 140,
		newType: "SUV",
		newEnergy: "Diesel",
		newIsAutomatic: true,
		newAirConditioning: true,
		newIsAvailable: true,
		newPassengers: 5,
		newDescription: "RS3 est une belle voiture",
	};
	it("should fail to modify cars due to wrong param", async () => {
		const response = await request(server)
			.put(`/api/cars`)
			.send(shouldModifyCars);

		expect(response.status).to.equal(404);
	});
	it("should fail to modify cars due to wrong id car", async () => {
		const response = await request(server)
			.put(`/api/cars/999`)
			.send(shouldModifyCars);
		expect(response.status).to.equal(404);
	});
	it("Should successfull modify cars", async () => {
		const response = await request(server)
			.put(`/api/cars/3`)
			.send(shouldModifyCars);
		expect(response.status).to.equal(200);
		expect(response.status).to.equal(200);
		expect(response.body).to.deep.include({
			message: "Car updated",
			modiffCars: [1],
		});
	});
});

describe("DELETE /api/cars", async () => {
	//CAS OU ON SUPPRIME UNE VOITURE
	it("Should fail to delete cars due to wrong param", async () => {
		const response = await request(server).delete(`/api/cars`);
		expect(response.status).to.equal(404);
	});
	it("Should delete cars", async () => {
		const response = await request(server).delete(`/api/cars/3`);
		expect(response.status).to.equal(200);
		expect(response.body).to.deep.include({ data: 1 });
	});
});

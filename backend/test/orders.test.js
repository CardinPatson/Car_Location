const chai = require("chai");
const { expect } = chai;

const { agent } = require("supertest");
const { omit } = require("lodash");

const server = require("../server");
const request = agent(server());

describe("Fetch orders test", async () => {
	it("Should return all cars", async () => {
        const response = await request("/api/orders")
        expect(response.status).to.equal(200)
        expect()
    });
});

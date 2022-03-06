const client = require("../db");
client.connect();

const getCars = (request, response) => {
  client.query(
    "SELECT * FROM cars c FULL OUTER JOIN images i ON c.id = i.id ORDER BY c.id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getCarById = (request, response) => {
  const id = parseInt(request.params.id);

  client.query(
    "SELECT * FROM cars c FULL OUTER JOIN images i ON c.id = i.id WHERE c.id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const addCar = (request, response) => {
  const {
    name,
    price,
    brand,
    model,
    color,
    doors,
    boot_size,
    type,
    energy,
    is_automatic,
    passengers,
    air_conditioning,
  } = request.body;

  client.query(
    "INSERT INTO cars(name, price, brand, model, color, doors, boot_size, type, energy, is_automatic, passengers, air_conditioning) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
    [
      name,
      price,
      brand,
      model,
      color,
      doors,
      boot_size,
      type,
      energy,
      is_automatic,
      passengers,
      air_conditioning,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Cars added with ID: ${result.insertId}`);
    }
  );
};

const updateCar = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    name,
    price,
    brand,
    model,
    color,
    doors,
    boot_size,
    type,
    energy,
    is_automatic,
    passengers,
    air_conditioning,
  } = request.body;

  client.query(
    "UPDATE cars SET name=$2, price=$3, brand=$4, model=$5, color=$6, doors=$7, boot_size=$8, type=$9, energy=$10, is_automatic=$11, passengers=$12, air_conditioning=$13 WHERE id = $1",
    [
      id,
      name,
      price,
      brand,
      model,
      color,
      doors,
      boot_size,
      type,
      energy,
      is_automatic,
      passengers,
      air_conditioning,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Cars modified with ID: ${id}`);
    }
  );
};

const deleteCar = (request, response) => {
  const id = parseInt(request.params.id);

  client.query("DELETE FROM cars WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Cars deleted with ID: ${id}`);
  });
  client.end;
};

module.exports = {
  getCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
};

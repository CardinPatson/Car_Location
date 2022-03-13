const client = require("../db");
client.connect();

const getCars = (request, response) => {
  client.query(
    "SELECT * FROM cars c FULL OUTER JOIN cars_brands cb ON c.id = cb.id",
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
    "SELECT * FROM cars c FULL OUTER JOIN cars_brands cb ON c.id = cb.id WHERE c.id = $1",
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
    description,
  } = request.body;

  client.query(
    "select * from cars_brands where brand=$1 and model=$2",
    [brand, model],
    (error, results) => {
      if (error) {
        throw error;
      }

      let id_brand;

      // si la Marque n'existe pas
      if (results.rows.length == 0) {
        //Insert into brand
        client.query(
          "INSERT INTO cars_brands(brand, model) VALUES($1,$2) RETURNING id",
          [brand, model],
          (error, results) => {
            if (error) {
              throw error;
            }

            id_brand = results.rows[0].id;
            //response.status(201).json(results.rows[0].id);
          }
        );
      } else {
        id_brand = results.rows[0].id;
        //response.status(201).json(results.rows[0].id);
      }

      //console.log(id_brand);

      client.query(
        "INSERT INTO cars(name, price, id_brand, color, doors, boot_size, type, energy, is_automatic, passengers, air_conditioning, description) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
        [
          name,
          price,
          id_brand,
          color,
          doors,
          boot_size,
          type,
          energy,
          is_automatic,
          passengers,
          air_conditioning,
          description,
        ],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(201).json(results);
        }
      );
    }
  );

  client.end;
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
    description,
  } = request.body;

  client.query(
    "UPDATE cars SET name=$2, price=$3, color=$4, doors=$5, boot_size=$6, type=$7, energy=$8, is_automatic=$9, passengers=$10, air_conditioning=$11, description=$12 WHERE id=$1",
    [
      id,
      name,
      price,
      color,
      doors,
      boot_size,
      type,
      energy,
      is_automatic,
      passengers,
      air_conditioning,
      description,
    ],
    (error, results1) => {
      if (error) {
        throw error;
      }

      client.query(
        "UPDATE cars_brands SET brand=$2, model=$3 WHERE id=$1",
        [id, brand, model],
        (error, results2) => {
          if (error) {
            throw error;
          }
          response.status(200).json();
        }
      );
    }
  );
};

const deleteCar = (request, response) => {
  const id = parseInt(request.params.id);

  client.query("DELETE FROM cars WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results);
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

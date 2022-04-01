const multerMiddleware = require("../middleware/image");
const { validationResult } = require("express-validator");
const format = require("pg-format");
const client = require("../db");
client.connect();

//GET
const getCars = (req, res, next) => {
	//RECUPERER LES INFOS DE LA VOITURE PUIS LES IMAGES DE LA VOITURE
	// if (!req.query) {
	
	const select_all_cars = `SELECT c.id, c.name, c.price, c.color, c.doors, c.boot_size, c.type, c.energy, c.is_automatic, c.passengers, c.air_conditioning, c.description, cb.brand, cb.model
							FROM cars c
							INNER JOIN cars_brands cb
							ON c.id = cb.id;`
	// async/await
	try {
	const res = await client.query(select_all_cars)
		res.status(200).json(res.rows);
	} catch (err) {
		res.status(500).json({ err });
        throw err;
	}
	};

// 	client.query(
// 		`SELECT c.id, name, price, id_brand, color, doors, boot_size, type, energy, is_automatic, passengers, air_conditioning, description,brand, model
// 		FROM cars c
// 		JOIN cars_brands cb ON c.id_brand = cb.id
// 		WHERE is_available != false`,
//     (error, results) => {
//       if (error) {
//         res.status(500).json({ error });
//         throw error;
//       }
//       res.status(200).json(results.rows);
//     },
//   );

	//TODO : ⚠️ RECUPERER TOUTES LES VOITURES MISE A PART CELLE QUI SE TROUVE DANS LE PARAMETRE
	// if (req.query) {
	// 	//RECUPERER UN TABLEAU D'ID AVEC REQ.QUERY
	// 	tabId = Objet.values(req.query);
	// 	//TODO Cette option sera implémenté Lorsque la foncetionnalité qui permet à l'utilisateur de passer une commande sera implémenté
	// 	client.query(
	// 		"SELECT * FROM cars WHERE id not in $1",
	// 		[tabId],
	// 		(error, result) => {
	// 			if (error) {
	// 				res.status(500).json({ error });
	// 			}
	// 			console.log(results.rows);
	// 			res.status(200).json(result.rows);
	// 		}
	// 	);
	// }

const getCarsImages = (req, res) => {
	client.query("SELECT * FROM images", (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

const getCarsOrders = (req, res) => {
	const { startDate, endDate, startTime, endTime } = req.query;
	//TODO : Effectuer une vérification sur les paramètres pour allez chercher les véhicules
	//TODO : Récupérer tous les id des voitures qui sont déjà louer dans cette plage horaire dans la table orders
	client.query(
		"SELECT id FROM orders WHERE date_departure >= $1 and end date_return <= $2",
		[startDate, endDate],
		(error, results) => {
			if (error) {
				throw error;
			}
			console.log(results.rows);
		}
	);
};

const getCarById = (req, res) => {
	if (req.params) {
		const id = parseInt(req.params.id);

		client.query(
			"SELECT * FROM cars c FULL OUTER JOIN cars_brands cb ON c.id = cb.id WHERE c.id = $1",
			[id],
			(error, results) => {
				if (error) {
					throw error;
				}
				res.status(200).json(results.rows);
			}
		);
	}
};

//POST
const addCar = async (req, res) => {
	const {
		name,
		price,
		brand,
		model,
		color,
		doors,
		bootSize,
		type,
		energy,
		isAutomatic,
		passengers,
		airCondition,
		description,
	} = req.body;

	let id_brand = 0;
	let is_available = true;
	client.query(
		"select id from cars_brands where brand=$1 and model=$2",
		[brand, model],
		async (error, results) => {
			// si la Marque n'existe pas

			if (error) {
				console.log("not connect to the database");
			}
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

						client.query(
							"INSERT INTO cars(name, price, id_brand, color, doors, boot_size, type, energy,is_available, is_automatic, passengers, air_conditioning, description) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id",
							[
								name,
								price,
								id_brand,
								color,
								doors,
								bootSize,
								type,
								energy,
								is_available,
								isAutomatic,
								passengers,
								airCondition,
								description,
							],
							(error, results) => {
								if (error) {
									throw error;
								}
								res.status(201).json(results);
							}
						);
					}
				);
			} else {
				id_brand = await results.rows[0].id;

				client.query(
					"INSERT INTO cars(name, price, id_brand, color, doors, boot_size, type, energy,is_available, is_automatic, passengers, air_conditioning, description) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id",
					[
						name,
						price,
						id_brand,
						color,
						doors,
						bootSize,
						type,
						energy,
						is_available,
						isAutomatic,
						passengers,
						airCondition,
						description,
					],
					(error, results) => {
						if (error) {
							throw error;
						}
						res.status(201).json(results);
					}
				);
			}
		}
	);

	client.end;
};

const addCarImages = (req, res, next) => {
	try {
		console.log(req.params);
		const idCars = req.params.id;
		console.log(idCars);

		//RETRIEVE THE PATH OF THE IMAGES
		const url_prev = `${req.protocol}://${req.get("host")}`;

		//MAKE A TABLE WITH IDCARS AND IMAGES PATH
		const values = req.files.map((x) => {
			return [idCars, `${url_prev}/images/${x.filename}`];
		});

		//FORMAT THE QUERY TO MAKE INSERTION
		const query = format(`INSERT INTO images(id , pic_name) VALUES %L`, values);
		client.query(query, (error, result) => {
			if (error) {
				res.status(400).json({ error });
			}
			res.status(200);
		});
	} catch (err) {
		console.error(err);
	}
};
//UPDATE
const updateCar = (req, res) => {
	const id = parseInt(req.params.id);
	const {
		name,
		price,
		brand,
		model,
		color,
		doors,
		bootSize,
		type,
		energy,
		isAutomatic,
		passengers,
		airCondition,
		description,
	} = req.body;

	client.query(
		"UPDATE cars SET name=$2, price=$3, color=$4, doors=$5, boot_size=$6, type=$7, energy=$8, is_automatic=$9, passengers=$10, air_conditioning=$11, description=$12 WHERE id=$1",
		[
			id,
			name,
			price,
			color,
			doors,
			bootSize,
			type,
			energy,
			isAutomatic,
			passengers,
			airCondition,
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
					res.status(200).json();
				}
			);
		}
	);
};

//DELETE
const deleteCar = (req, res) => {
	const id = parseInt(req.params.id);

	client.query("DELETE FROM cars WHERE id = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		res.status(200).json(results);
	});
	client.end;
};

const isExist = (req, res) => {
	const { brand, model } = req.body;

	let id_brand = 0;

	client.query(
		"select id from cars_brands where brand=$1 and model=$2",
		[brand, model],
		(error, results) => {
			if (error) {
				throw error;
			}
			res.status(200).json(results);
		}
	);
	client.end;
};

module.exports = {
	getCars,
	getCarsImages,
	getCarsOrders,
	getCarById,
	addCar,
	addCarImages,
	updateCar,
	deleteCar,
	isExist,
};

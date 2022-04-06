const multerMiddleware = require("../middleware/image");
const { validationResult } = require("express-validator");
const format = require("pg-format");
const pool = require("../db");
pool.connect();

//const sequelize = require("../connect");
const Images = require("../models/images");

const getCars = async (req, res, next) => {
    try {
        // let minPrice = req.params.minPrice; //either a value or undefined
        // let maxPrice = req.params.maxPrice;
        // let brand = req.params.brand;
        // let model = req.params.model;
        // let startDate = req.params.startDate;
        // let endDate = req.params.endDate;

        const data = await pool.query(
            `SELECT c.id, c.name, c.price, c.color, c.doors, c.boot_size, c.type, c.energy, c.is_automatic, c.passengers, c.air_conditioning, c.description, cb.brand, cb.model
              FROM cars c
              INNER JOIN cars_brands cb
              ON c.id_brand = cb.id;`
        );
        res.status(200).json(data.rows);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ err });
    }
};

//GET
const getCars2 = (req, res, next) => {
    //RECUPERER LES INFOS DE LA VOITURE PUIS LES IMAGES DE LA VOITURE
    // if (!req.query) {
    pool.query(
        `SELECT c.id, c.name, c.price, c.color, c.doors, c.boot_size, c.type, c.energy, c.is_automatic, c.passengers, c.air_conditioning, c.description, cb.brand, cb.model
        FROM cars c
        INNER JOIN cars_brands cb
        ON c.id_brand = cb.id;`,
        (error, results) => {
            if (error) {
                res.status(500).json({ error });
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
    // }

    //TODO : ⚠️ RECUPERER TOUTES LES VOITURES MISE A PART CELLE QUI SE TROUVE DANS LE PARAMETRE
    // if (req.query) {
    // 	//RECUPERER UN TABLEAU D'ID AVEC REQ.QUERY
    // 	tabId = Objet.values(req.query);
    // 	//TODO Cette option sera implémenté Lorsque la foncetionnalité qui permet à l'utilisateur de passer une commande sera implémenté
    // 	pool.query(
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
};

const getCarsImages = (req, res) => {
    pool.query("SELECT * FROM images", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getCarsOrders = (req, res) => {
    const { startDate, endDate, startTime, endTime } = req.query;
    //TODO : Effectuer une vérification sur les paramètres pour allez chercher les véhicules
    //TODO : Récupérer tous les id des voitures qui sont déjà louer dans cette plage horaire dans la table orders
    pool.query(
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

        pool.query(
            "SELECT * FROM cars c INNER JOIN cars_brands cb ON c.id = cb.id WHERE c.id = $1",
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

const getCarByName = (req, res) => {
    if (req.params) {
        const name = parseInt(req.params.name);

        pool.query(
            "SELECT * FROM cars c INNER JOIN cars_brands cb ON c.id = cb.id WHERE c.name = $1",
            [name],
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
        description
    } = req.body;

    let id_brand = 0;
    let is_available = true;
    pool.query(
        "select id from cars_brands where brand=$1 and model=$2",
        [brand, model],
        async (error, results) => {
            // si la Marque n'existe pas

            if (error) {
                console.log("not connect to the database");
            }
            if (results.rows.length == 0) {
                //Insert into brand
                pool.query(
                    "INSERT INTO cars_brands(brand, model) VALUES($1,$2) RETURNING id",
                    [brand, model],
                    (error, results) => {
                        if (error) {
                            throw error;
                        }
                        id_brand = results.rows[0].id;

                        pool.query(
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
                                description
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

                pool.query(
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
                        description
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

    pool.end;
};

const testRachiid007 = (req, res, next) => {
    idCars = 20;
    const myArray = ["first1.png", "second2.png", "third.png"];

    const okok = JSON.stringify(myArray);

    console.log(okok);

    try {
        pool.query(
            `INSERT INTO images(id , pic_name)
                VALUES($1, array[$2]::text[])`,
            [idCars, okok],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(400).json({ error });
                }
                console.log(result);
                res.status(200).json({ result });
            }
        );
    } catch (err) {
        console.error(err);
    }
};

const getTests = async (req, res, next) => {
    try {
        const data = await pool.query(`SELECT * FROM images;`);
        console.log(data);
        res.status(200).json(data.rows);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ err });
    }
};

const getTests22 = () => {
    // Find all users
    Images.findAll().then((users) => {
        console.log("All image:", JSON.stringify(users, null, 4));
    });
};

getTests22();

const addCarImages = (req, res, next) => {
    try {
        const idCars = req.params.id;

        //RETRIEVE THE PATH OF THE IMAGES
        const url_prev = `${req.protocol}://${req.get("host")}`;

        //MAKE A TABLE WITH IDCARS AND IMAGES PATH
        const values = req.files.map((x) => {
            return `${url_prev}/images/${x.filename}`;
        });

        //const images = { ...req.files };

        console.log(idCars);
        console.log(values);

        //FORMAT THE QUERY TO MAKE INSERTION

        pool.query(
            `INSERT INTO images(id , pic_name) 
            VALUES($1, array[$2])`,
            [idCars, values],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(400).json({ error });
                }
                console.log(result);
                res.status(200).json({ result });
            }
        );
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
        description
    } = req.body;

    pool.query(
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
            description
        ],
        (error, results1) => {
            if (error) {
                throw error;
            }

            pool.query(
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

    pool.query("DELETE FROM cars WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results);
    });
    pool.end;
};

const isExist = (req, res) => {
    const { brand, model } = req.body;

    let id_brand = 0;

    pool.query(
        "select id from cars_brands where brand=$1 and model=$2",
        [brand, model],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results);
        }
    );
    pool.end;
};

module.exports = {
    getCars,
    getCarsImages,
    getCarsOrders,
    getCarById,
    getCarByName,
    addCar,
    addCarImages,
    updateCar,
    deleteCar,
    isExist,
    testRachiid007,
    getTests,
    getTests22
};

const multerMiddleware = require("../middleware/image");

const { images, cars, cars_brands } = require("../database/models");

const isUniqueCarName = async (name) => {
	const car = await cars.findOne({ where: { name } });
	if (car) {
		return false;
	}
	return true;
};

const getAllCars = async (req, res) => {
	try {
		const data = await cars.findAll({
			where: { is_available: true },
			include: [
				{
					model: cars_brands,
					required: true,
					as: "cars_brands",
				},
				{
					model: images,
					required: false,
					as: "images",
				},
			],
		});
		return res.status(200).json({ data });
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const getCarById = async (req, res) => {
	try {
		if (req.params.id) {
			const id = parseInt(req.params.id);

			const data = await cars.findByPk(id, {
				include: [
					{
						model: cars_brands,
						required: true,
						as: "cars_brands",
					},
					{
						model: images,
						required: false,
						as: "images",
					},
				],
			});
			return res.status(200).json({ data });
		}
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const getCarByName = async (req, res) => {
	try {
		if (typeof req.params.name === "string") {
			const name = req.params.name;

			const data = await cars.findOne({
				where: { name: name },
				include: [
					{
						model: cars_brands,
						required: true,
						as: "cars_brands",
					},
					{
						model: images,
						required: true,
						as: "images",
					},
				],
			});
			return res.status(200).json({ data });
		}
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

// POST !!!

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
		isAvailable,
		passengers,
		airConditioning,
		description,
	} = req.body;
	console.log(req.body);
	try {
		const data = await cars_brands.findOrCreate({
			where: { brand: brand, model: model },
			attributes: ["id"],
		});
		console.log("ICI");
		const data2 = await cars.create({
			name: name,
			price: price,
			brand_id: data[0].id, // send for addCar !
			color: color,
			doors: doors,
			boot_size: bootSize,
			type: type,
			energy: energy,
			is_automatic: isAutomatic,
			air_conditioning: airConditioning,
			is_available: isAvailable,
			passengers: passengers,
			description: description,
		});
		console.log(data2);
		return res.status(200).json({ id: data2.dataValues.id });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Internal server error test",
		});
	}
};

const addCarImages = async (req, res, next) => {
	try {
		const car_id = req.params.id;

		//RETRIEVE THE PATH OF THE IMAGES
		const url_prev = `${req.protocol}://${req.get("host")}`;

		//MAKE A TABLE WITH IDCARS AND IMAGES PATH
		const values = req.files.map((x) => {
			return `${url_prev}/images/${x.filename}`;
		});

		console.log(values);

		const data = await images.create({
			car_id: car_id,
			file_names: values,
		});

		return res.status(201).json({ data });
	} catch (error) {
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};

const updateCar = async (req, res) => {
	const {
		newName,
		newPrice,
		newBrand,
		newModel,
		newColor,
		newDoors,
		newBootSize,
		newType,
		newEnergy,
		newIsAutomatic,
		newIsAvailable,
		newPassengers,
		newAirConditioning,
		newDescription,
	} = req.body;

	try {
		if (req.params.id) {
			const car_id = parseInt(req.params.id);

			const reponse = await cars.findByPk(car_id, {
				include: [
					{
						model: cars_brands,
						required: true,
						as: "cars_brands",
					},
					{
						model: images,
						required: false,
						as: "images",
					},
				],
			});

			if (
				(newName == reponse.name &&
					newPrice == reponse.price &&
					newBrand == reponse.cars_brands.brand &&
					newModel == reponse.cars_brands.model &&
					newColor == reponse.color &&
					newDoors == reponse.doors &&
					newBootSize == reponse.boot_size &&
					newType == reponse.type &&
					newEnergy == reponse.energy &&
					newIsAutomatic == reponse.is_automatic &&
					newIsAvailable == reponse.is_available &&
					newPassengers == reponse.passengers &&
					newAirConditioning == reponse.air_conditioning &&
					newDescription == reponse.description) ||
				(newName == reponse.name &&
					newPrice == reponse.price &&
					newBrand == reponse.cars_brands.brand &&
					newModel == reponse.cars_brands.model &&
					newColor == reponse.color &&
					newDoors == reponse.doors &&
					newBootSize == reponse.boot_size &&
					newType == reponse.type &&
					newEnergy == reponse.energy &&
					newIsAutomatic == reponse.is_automatic &&
					newIsAvailable == reponse.is_available &&
					newPassengers == reponse.passengers &&
					newAirConditioning == reponse.air_conditioning &&
					newDescription == reponse.description)
			) {
				return res.status(200).json({
					message: "No changes",
				});
			}

			const count = await cars.count({
				where: { brand_id: reponse.brand_id },
			});

			const insertOrUpdateCarsBrands = async (count, condition, values) => {
				// Si que 1 voiture a la marque/model + changement -> UPDATE
				if (
					(count === 1 && newBrand != reponse.cars_brands.brand) ||
					newModel != reponse.cars_brands.model
				) {
					return await cars_brands.update(values, condition);
				}

				// INSERT car risque de modifier Marque/Modele qui appartien a une autre...
				if (
					(count > 1 && newBrand != reponse.cars_brands.brand) ||
					newModel != reponse.cars_brands.model
				) {
					return await cars_brands.create(values);
				} else {
					return true;
				}
			};

			const condition = {
				where: { id: reponse.brand_id },
			};

			const values = {
				brand: newBrand,
				model: newModel,
			};

			const receive = await insertOrUpdateCarsBrands(count, condition, values);

			// console.log(receive);

			if (receive) {
				const data = await cars.update(
					{
						name: newName,
						price: newPrice,
						brand_id: reponse.brand_id,
						color: newColor,
						doors: newDoors,
						boot_size: newBootSize,
						type: newType,
						energy: newEnergy,
						is_automatic: newIsAutomatic,
						air_conditioning: newAirConditioning,
						is_available: newIsAvailable,
						passengers: newPassengers,
						description: newDescription,
					},
					{
						where: { id: car_id },
					}
				);

				return res.status(200).json({
					message: "Car updated",
					data,
				});
			} else {
				return res.status(500).json({
					message: "A verifier update Car !!!",
				});
			}
		}
	} catch (error) {
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};

const getCarsImages = async (req, res) => {
	try {
		const data = await cars.findAll({});
		return res.status(200).json({ data });
	} catch (error) {
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};

const deleteCar = async (req, res) => {
	try {
		if (req.params.id) {
			const id = parseInt(req.params.id);
			const data = await cars.destroy({
				where: { id: id },
			});
			return res.status(200).json({ data });
		}
	} catch (error) {
		return res.status(500).json({
			message: "Internal server error",
		});
	}
};

module.exports = {
	getAllCars,
	getCarById,
	getCarByName,
	addCar,
	updateCar,
	deleteCar,
	addCarImages,
	getCarsImages,
};

const multerMiddleware = require("../middleware/image");

const { images, cars, cars_brands } = require("../database/models");

const isUniqueCarName = async (name) => {
    try {
        const data = await cars.count({
            where: { name: name }
        });

        if (data > 0) {
            throw new Error("Car name already exists");
        }

        return true;
    } catch (error) {
        return false;
    }
};

const getAllCars = async (req, res) => {
    try {
        const data = await cars.findAll({
            where: { is_available: true },
            include: [
                {
                    model: cars_brands,
                    required: true,
                    as: "cars_brands"
                }
            ]
        });

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
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
                        as: "cars_brands"
                    },
                    {
                        model: images,
                        required: false,
                        as: "images"
                    }
                ]
            });
            return res.status(200).json(data);
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
                        as: "cars_brands"
                    },
                    {
                        model: images,
                        required: true,
                        as: "images"
                    }
                ]
            });
            return res.status(200).json({ data });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getCarsImages = async (req, res) => {
    try {
        const data = await images.findAll({
            model: images,
            required: false,
            as: "images"
        });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
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
        description
    } = req.body;
    try {
        const data = await cars_brands.findOrCreate({
            where: { brand: brand, model: model },
            attributes: ["id"]
        });
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
            description: description
        });
        return res.status(200).json({ id: data2.dataValues.id });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error test"
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

        const data = await images.create({
            car_id: car_id,
            file_names: values
        });

        return res.status(201).json({ data });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Seule petit problème : Si on modifie la marque et le modèle, les ancienne données resterons dans la DB meme s'il ne sont reliée a aucune voiture !!!

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
        newDescription
    } = req.body;

    try {
        if (!req.params.id) {
            return res.status(400).json({
                message: "Bad request"
            });
        }
        const car_id = parseInt(req.params.id);

        const dataCar = await cars.findByPk(car_id);

        if (!dataCar) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        const brandAndModel = await cars_brands.findOrCreate({
            where: { brand: newBrand, model: newModel }
        });

        if (
            newName == dataCar.name &&
            newPrice == dataCar.price &&
            newBrand == dataCar.cars_brands.brand &&
            newModel == dataCar.cars_brands.model &&
            newColor == dataCar.color &&
            newDoors == dataCar.doors &&
            newBootSize == dataCar.boot_size &&
            newType == dataCar.type &&
            newEnergy == dataCar.energy &&
            newIsAutomatic == dataCar.is_automatic &&
            newIsAvailable == dataCar.is_available &&
            newPassengers == dataCar.passengers &&
            newAirConditioning == dataCar.air_conditioning &&
            newDescription == dataCar.description
        ) {
            return res.status(200).json({
                message: "No changes"
            });
        }

        const modiffCars = await cars.update(
            {
                name: newName,
                price: newPrice,
                brand_id: brandAndModel[0].id,
                color: newColor,
                doors: newDoors,
                boot_size: newBootSize,
                type: newType,
                energy: newEnergy,
                is_automatic: newIsAutomatic,
                air_conditioning: newAirConditioning,
                is_available: newIsAvailable,
                passengers: newPassengers,
                description: newDescription
            },
            {
                where: { id: car_id }
            }
        );

        return res.status(200).json({
            message: "Car updated",
            modiffCars
        });
    } catch (error) {
        console.log("ERROR : ", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deleteCar = async (req, res) => {
    try {
        if (req.params.id) {
            const id = parseInt(req.params.id);
            const data = await cars.destroy({
                where: { id: id }
            });
            return res.status(200).json({ data });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const testCar = async (req, res) => {
    try {
        if (req.params.id) {
            const car_id = parseInt(req.params.id);

            const reponse = await cars.findByPk(car_id, {
                include: [
                    {
                        model: cars_brands,
                        required: true,
                        as: "cars_brands"
                    }
                ]
            });

            const count = await cars.count({
                where: { brand_id: reponse.brand_id, id: reponse.id },
                include: [
                    {
                        model: cars_brands,
                        required: true,
                        as: "cars_brands"
                        // where: { id: reponse.id }
                    }
                ]
            });

            console.log("Count : --> ", count);

            return res.status(200).json({ count });
        }
    } catch (error) {
        console.log("Error !!! -> ", error);
        return res.status(500).json({
            message: "Internal server error"
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
    testCar
};

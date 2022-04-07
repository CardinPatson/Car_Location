const multerMiddleware = require("../middleware/image");

const { images, cars, cars_brands } = require("../database/models");

const getAllCars = async (req, res) => {
    try {
        const data = await cars.findAll({
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

        return res.status(200).json({ message: true });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const addCarImages = async (req, res, next) => {
    try {
        const car_id = parseInt(req.params.id);

        //RETRIEVE THE PATH OF THE IMAGES
        const url_prev = `${req.get("host")}`;

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
        return res.status(500).json({ error: error.message });
    }
};

const insertOrUpdateCarsBrands = async (values, condition) => {
    // Si que 1 voiture a la marque/model -> UPDATE
    if (count === 1) {
        return await cars_brands.update(values, condition);

        // INSERT car risque de modifier une qui appartien a une autre...
    } else {
        return await cars_brands.create(values);
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
        newFileCnames
    } = req.body;

    try {
        if (req.params.id) {
            const id = parseInt(req.params.id);

            const reponse = await cars.findOne({
                where: { id: id },
                attributes: ["brand_id"]
            });

            const count = await cars_brands.count({
                where: { id: reponse.brand_id }
            });

            changeCarsBrands;

            return res.status(200).json({ reponse });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// const upsert = async (values, condition) => {
//     // Si que 1 voiture a la marque/model -> UPDATE
//     if (count === 1) {
//         const changeCarsBrands = await cars_brands.update(
//             {
//                 brand: newBrand,
//                 model: newModel
//             },
//             {
//                 where: { id: reponse.brand_id }
//             }
//         );
//     } else {
//         const changeCarsBrands = await cars_brands.create({
//             brand: newBrand,
//             model: newModel
//         });
//     }
// };

// const upsert = async (values, condition) => {
//     const obj = await cars_brands.findOne({
//         where: condition
//     });
//     if (obj) {
//         return obj.update(values);
//     }
//     return cars_brands.create(values);
// };

// await upsert(
//     {
//         brand: newBrand,
//         model: newModel
//     },
//     {
//         where: { id: reponse.brand_id }
//     }
// );

const getCarsImages = async (req, res) => {
    try {
            const data = await cars.findAll({});
            return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).send(error.message);
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
        return res.status(500).send(error.message);
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
    getCarsImages
};

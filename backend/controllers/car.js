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
                    required: false,
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
            brand_id: data[0].id,
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
            file_names: fileNames
        });

        const data3 = await images.create({
            car_id: data[0].id,
            file_names: fileNames
        });

        return res.status(200).json({ message: true });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// const updateCar = async (req, res) => {
//     const {
//         newName,
//         newPrice,
//         newBrand,
//         newModel,
//         newColor,
//         newDoors,
//         newBootSize,
//         newType,
//         newEnergy,
//         newIsAutomatic,
//         newIsAvailable,
//         newPassengers,
//         newAirConditioning,
//         newDescription,
//         newFileCnames
//     } = req.body;

//     try {
//         if (req.params.id) {
//             const id = parseInt(req.params.id);

//             const reponse = await cars.findOne({
//                 where: { id: id },
//                 attributes: ["brand_id"]
//             });

//             const count = await cars_brands.count({
//                 where: { id: reponse.brand_id }
//             });

//             // Si que 1 voiture a la marque/model -> UPDATE
//             if (count === 1) {
//                 const changeCarsBrands = await cars_brands.update(
//                     {
//                         brand: newBrand,
//                         model: newModel
//                     },
//                     {
//                         where: { id: reponse.brand_id }
//                     }
//                 );
//             } else {
//                 const changeCarsBrands = await cars_brands.create({
//                     brand: newBrand,
//                     model: newModel
//                 });
//             }

//             changeCarsBrands;

//             return res.status(200).json({ reponse });
//         }
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };

// const upsert = async (values, condition) => {
//     const obj = await Model.findOne({
//         where: condition
//     });
//     if (obj) {
//         return obj.update(values);
//     }
//     return Model.create(values);
// };

// await upsert(
//     {
//         first_name: "jane"
//     },
//     {
//         id: 1234
//     }
// );

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

const addCarImages = async (req, res) => {
    try {
        if (req.params.id) {
            const car_id = parseInt(req.params.id);

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
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCars,
    getCarById,
    getCarByName,
    addCar,
    // updateCar,
    deleteCar,
    addCarImages
};

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
        boot_size,
        type,
        energy,
        is_automatic,
        is_available,
        passengers,
        air_conditioning,
        description,
        file_names
    } = req.body;

    try {
        const data = await cars_brands.findOrCreate({
            where: { brand: brand, model: model }
        });
        const recupBrandId = JSON.stringify(data[0].id);

        const data2 = await cars.create({
            name: name,
            price: price,
            brand_id: recupBrandId,
            color: color,
            doors: doors,
            boot_size: boot_size,
            type: type,
            energy: energy,
            is_automatic: is_automatic,
            air_conditioning: air_conditioning,
            is_available: is_available,
            passengers: passengers,
            description: description,
            file_names: file_names
        });

        const recupCarId = JSON.stringify(data2.id);

        const data3 = await images.create({
            car_id: recupCarId,
            file_names: file_names
        });

        return res.status(200).json({ data3 });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateCar = async (req, res) => {
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
        is_available,
        passengers,
        air_conditioning,
        description,
        file_names
    } = req.body;

    try {
        if (req.params.id) {
            const idCar = parseInt(req.params.id);
            const data = await cars_brands.findOrCreate({
                where: { brand: brand, model: model }
            });
            const recupBrandId = JSON.stringify(data[0].id);

            const data2 = await cars.update(
                {
                    where: { id: idCar },
                    name: name,
                    price: price,
                    brand_id: recupBrandId,
                    color: color,
                    doors: doors,
                    boot_size: boot_size,
                    type: type,
                    energy: energy,
                    is_automatic: is_automatic,
                    air_conditioning: air_conditioning,
                    is_available: is_available,
                    passengers: passengers,
                    description: description,
                    file_names: file_names,

                    images: {
                        car_id: recupCarId,
                        file_names: file_names
                    }
                },
                {
                    include: [
                        {
                            model: images,
                            as: "images"
                        }
                    ]
                }
            );
            return res.status(200).json({ data2 });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteCar = async (req, res) => {
    try {
        if (req.params.id) {
            const id = parseInt(req.params.id);
            const data = await cars.destroy({
                where: { name: id }
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
    deleteCar
};

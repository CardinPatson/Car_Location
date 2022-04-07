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
            where: { brand: brand, model: model },
            attributes: ['id']
        });

        const data2 = await cars.create({
            name: name,
            price: price,
            brand_id: data[0].id,
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

        const data3 = await images.create({
            car_id: data[0].id,
            file_names: file_names
        });

        return res.status(200).json({ "message": true });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateCar = async (req, res) => {
    const {
        new_name,
        new_price,
        new_brand,
        new_model,
        new_color,
        new_doors,
        new_boot_size,
        new_type,
        new_energy,
        new_is_automatic,
        new_is_available,
        new_passengers,
        new_air_conditioning,
        new_description,
        new_file_names
    } = req.body;

    try {
        if (req.params.id) {
            const id = parseInt(req.params.id);

            const reponse = await cars.findOne({
                where: {id: id},
                attributes: ['brand_id']
            });

            const count = await cars_brands.count({
                where: { id: reponse.brand_id }
            });

            // Si que 1 voiture a la marque/model -> UPDATE
            if (count === 1) {
                const changeCarsBrands = await cars_brands.update(
                    {
                        brand: new_brand,
                        model: new_model
                    },
                    {
                        where: { id: reponse.brand_id }
                    }
                );
            } else {
                const changeCarsBrands = await cars_brands.create({
                    brand: new_brand,
                    model: new_model
                })
            }


            return res.status(200).json({ reponse });
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
    deleteCar
};

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

            if (
                newName == reponse.name &&
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
                newDescription == reponse.description
            ) {
                return res.status(200).json({
                    message: "No changes"
                });
            }

            // Combien de voiture ont les mêmes Marques/Modele que moi ?
            const count1 = await cars.count({
                where: { brand_id: reponse.brand_id, id: reponse.id },
                include: [
                    {
                        model: cars_brands,
                        required: true,
                        as: "cars_brands"
                    }
                ]
            });

            // console.log("Count : --> ", count);

            // si que 1 + c'est moi => UPDATE
            if (count1 == 1) {
                const dataCarsBrands = await cars_brands.update(
                    { brand: newBrand, model: newModel },
                    { where: { id: reponse.brand_id } }
                );

                const data = await cars.update(
                    {
                        name: newName,
                        price: newPrice,
                        brand_id: dataCarsBrands.id,
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
                return res.status(200).json({ data });
            }

            // Si que 1 + pas moi => INSERT

            const count2 = await cars.count({
                where: {
                    brand_id: reponse.brand_id
                },
                include: [
                    {
                        model: cars_brands,
                        required: true,
                        as: "cars_brands"
                    }
                ]
            });

            if (count2 > 0) {
                const dataCarsBrands = await cars_brands.findOrCreate({
                    where: { brand: newBrand, model: newModel },
                    attributes: ["id"]
                });

                const data = await cars.update(
                    {
                        name: newName,
                        price: newPrice,
                        brand_id: dataCarsBrands.id,
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
                return res.status(200).json({ data });
            } else {
                console.log("!!! Else ... Bizarre !!!");
                return res.status(500).json({
                    message: "Un truc vraiment bizarre !!!"
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const numberCarsSameBrandAndModel = await cars.count({
    where: {
        brand_id: dataCar.brand_id
    }
});

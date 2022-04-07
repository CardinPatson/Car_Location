
    cars_brands.create(
        {
            brand: brand,
            model: model,
            createdAt: time,
            updatedAt: time,

            cars_brands: {
                name: name,
                price: price,
                brand_id: brand_id,
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
                createdAt: time,
                updatedAt:  time,
            },
            images: {
        "car_id": 1,
        "file_names": [
          "imagesblabla.jpg",
          "ramadan.jpg"
        ],
        "createdAt": "2022-04-06T16:22:20.474Z",
        "updatedAt": "2022-04-06T16:22:20.474Z"
            }
            }
        },
        {
            include: [
                {
                    association: Product.User,
                    include: [User.Addresses]
                }
            ]
        }
    );

    try {
        const data = await cars_brands.create({
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
        description
    } = req.body;

    const time = new Date().toISOString();

    cars_brands.findOrCreate({
        order: [
            // will return `name`
            ["name"]
        ],
        where: { brand: brand, model: model }
    });
};




cars.create({
        name: name,
    price: price,
    brand_id: brand_id,
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
  user: {
    firstName: 'Mick',
    lastName: 'Broadstone',
  }
}, {
  include: [{
    association: Product.User
  }]
});
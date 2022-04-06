const { images, cars, Cars_brands } = require("../database/models");

const getTests22 = async (req, res) => {
    try {
        const data = await images.findAll({
            logging: false
        });
        console.log(data);
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
};

module.exports = {
    getTests22
};

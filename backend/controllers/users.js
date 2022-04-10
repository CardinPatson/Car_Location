const { admins, customers, orders } = require("../database/users");
require("dotenv").config();

const isUniqueMail = async (mail) => {
    try {
        const data = await users.count({
            where: { mail: mail }
        });

        if (data > 0) {
            throw new Error("Email already exists");
        }
        return true;
    } catch (error) {
        return false;
    }
};

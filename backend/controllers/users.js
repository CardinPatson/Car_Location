const { admins, users, orders } = require("../database/models");
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

const getAllUsers = async (req, res) => {
    return;
};

const getUserById = async (req, res) => {
    return;
};

const getUserByName = async (req, res) => {
    return;
};

const addUser = async (req, res) => {
    return;
};

const updateUser = async (req, res) => {
    return;
};

const deleteUser = async (req, res) => {
    return;
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByName,
    addUser,
    updateUser,
    deleteUser
};

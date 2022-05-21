require("dotenv").config();
const { DB_HOST, DB_USERNAME, DB_NAME, DB_PASSWORD } = process.env;
const { DB_HOST_TEST, DB_USERNAME_TEST, DB_NAME_TEST, DB_PASSWORD_TEST } =
    process.env;

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "postgres",
        logging: false,
        define: {
            freezeTableName: true,
            timestamps: false
        }
    },
    test: {
        username: DB_USERNAME_TEST,
        password: DB_PASSWORD_TEST,
        database: DB_NAME_TEST,
        host: DB_HOST_TEST,
        dialect: "postgres",
        logging: false,
        define: {
            freezeTableName: true,
            timestamps: false
        }
    },
    production: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "postgres",
        logging: false,
        define: {
            freezeTableName: true,
            timestamps: false
        }
    }
};

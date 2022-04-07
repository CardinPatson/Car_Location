require("dotenv").config();
const { DB_HOST, DB_PORT, DB_USERNAME, DB_NAME, DB_PASSWORD } = process.env;

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "postgres",
        define: {
            freezeTableName: true,
            underscored: true
        }
    },
    test: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "postgres",
        define: {
            freezeTableName: true,
            underscored: true
        }
    },
    production: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "postgres",
        define: {
            freezeTableName: true,
            underscored: true
        }
    }
};
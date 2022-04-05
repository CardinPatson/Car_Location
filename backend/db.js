const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

//configuration BDD
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

module.exports = pool;

// Pour tester la co à la DB !
// const seConnecterDb = async () => {
//     try {
//         const res = await pool.query(`SELECT * FROM cars`);
//         console.log(res);
//         pool.end(); //await
//     } catch (err) {
//         console.log(err.stack);
//     }
// };

// seConnecterDb();

const db = require("../db");
exports.addCars = async (req, res) => {
	//controllers
	console.log("try connection");
	try {
		const {
			price,
			brand,
			model,
			color,
			doors,
			boot_size,
			type,
			energy,
			is_automatic,
			passengers,
			air_cond,
		} = req.body;
		console.log(price, brand, model, color, doors, boot_size, type);
		const newCars = await db.query(
			"INSERT INTO voiture(price, brand, model , color , doors , boot_size , type, energy, is_automatic, passengers, air_cond) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
			[
				price,
				brand,
				model,
				color,
				doors,
				boot_size,
				type,
				energy,
				is_automatic,
				passengers,
				air_cond,
			]
		);
		res.json(newCars.rows);
		console.log("connection");
	} catch (error) {
		console.log(err);
	}
};

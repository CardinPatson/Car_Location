const multer = require("multer");

const MIME_TYPES = {
	"images/jpeg": "jpg",
	"image/jpg": "jpg",
	"image/png": "png",
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		//Config pour la destination des images
		callback(null, "images");
	},
	filename: (req, files, callback) => {
		//Config pour rendre le nom de l'image unique
		for (let file in files) {
			console.log(file);
			const name = file.originalname.split(" ").join("_");
			const extension = MIME_TYPES[file.mimetype];
			callback(null, `${name}${Date.now()}.${extension}`);
		}
	},
});

module.exports = multer({ storage: storage });

const multer = require("multer");
const { promisify } = require("util");
const MIME_TYPES = {
	"image/jpeg": "jpg",
	"image/jpg": "jpg",
	"image/png": "png",
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		//Config pour la destination des images
		callback(null, "images");
	},
	filename: (req, file, callback) => {
		//Config pour rendre le nom de l'image unique
		const name = file.originalname.split(" ").join("_");
		const extension = MIME_TYPES[file.mimetype];
		callback(null, `${name}${Date.now()}.${extension}`);
	},
});
//image est le nom de la clé initialisé dans le formData  10 le nombre de fichier max
const multerFiles = multer({ storage: storage }).array("image", 10);
//pour que le middleware soit utilisé avec async et await
const multerFilesMiddleware = promisify(multerFiles);
module.exports = multerFilesMiddleware;

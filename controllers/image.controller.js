const fs = require("fs");
const Image = require("../model/image");

exports.saveImage = async (req, res, next) => {
    try {
        const image = new Image({
            user: req.body.user,
            imagePath: `uploads/${req.file.originalname}`
        });

        const result = await image.save();
        if (result) return res.status(200).send("Image recieved successfully");
        
    }
    catch(err) {
        return res.status(400).send(err.message);
    }
}

exports.transferImage = async (req, res, next) => {
	const tempPath = req.file.path;
	const targetPath = `uploads/${req.file.originalname}`;

	const src = await fs.createReadStream(tempPath);
	const dest = await fs.createWriteStream(targetPath);

	src.pipe(dest);
    next();
}
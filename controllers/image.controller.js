const fs = require("fs");
const Image = require("../model/image");

exports.saveImage = async (req, res, next) => {

    try {
        const image = new Image({
            user: req.body.user,
            imagePath: req.iPaths
        });

        const result = await image.save();
        if (result) return res.status(200).send("Image recieved successfully");

    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}

exports.transferImage = async (req, res, next) => {
    try {
        const paths = [];
        if (!req.files.length) {
            return res.status(401).send("No file supplied")
        }

        for (file of req.files) {

            // getting the target file and destination path
            const tempPath = file.path; // pick up file/s from here (specifiled in multer({dest : "./uploads/FROMUSER"}))
            const targetPath = `uploads/${file.originalname}`; // drop file/s here
            paths.push(targetPath);

            const src = fs.createReadStream(tempPath);
            const dest = fs.createWriteStream(targetPath);

            src.pipe(dest); // I do not know what this is doing ?
        }
        console.log(paths);
        req.iPaths = paths;
        next();
    }
    catch (err) {
        return res.status(400).send("Error while transfering :" + err.message);
    }
}

exports.sendIamge = async (req, res, next) => {
    try {
        const findUser = req.params.user;
        const user = await Image.find({
            user: findUser
        });

        if (!user) res.status(400).send("Could not find the user...");

        // why this is sending just single file only ?
        return res.download( user[0].imagePath[0], user[0].imagePath[1], (err) => {
            if (err) console.log("error accured...", err);
        });
    }
    catch (err) {
        return res.status(400).send("error accured..." + err.message);
    }

}
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const mongoose = require("mongoose");
const fs = require("fs");

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://localhost/fsdemo", {
			useUnifiedTopology: true,
			useNewUrlParser: true
		});
	}
	catch (err) {
		console.log(err.message);
	}
};

connectDB();

const app = express();

app.use(express.json());

app.post("/upload", upload.single("file"), (req, res) => {

	const tempPath = req.file.path;
	const targetPath = `uploads/${req.file.originalname}`;

	const src = fs.createReadStream(tempPath);
	const dest = fs.createWriteStream(targetPath);
	src.pipe(dest);

	return res.status(200).send("recieved");
});

const PORT = process.env.PORT || 2021;
app.listen(PORT, () => {
	console.log("Listening on port : ", PORT);
});

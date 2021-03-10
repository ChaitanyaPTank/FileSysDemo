const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./uploads/FROMUSER" });
const mongoose = require("mongoose");
const imageController = require("./controllers/image.controller");

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

app.post("/upload", upload.single("file"), imageController.transferImage, imageController.saveImage );

const PORT = process.env.PORT || 2021;
app.listen(PORT, () => {
	console.log("Listening on port : ", PORT);
});

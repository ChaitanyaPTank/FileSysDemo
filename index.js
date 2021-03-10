const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const imageController = require("./controllers/image.controller");
const morgan = require("morgan");

// connecting to the database
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

const upload = multer({dest : "./uploads/FROMUSER"});

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.post("/upload", upload.any(), imageController.transferImage, imageController.saveImage );

const PORT = process.env.PORT || 2021;
app.listen(PORT, () => {
	console.log("Listening on port : ", PORT);
});

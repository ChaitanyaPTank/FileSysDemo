const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    user : { type: String, required: true },
    imagePath: { type: [String], required: true }
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
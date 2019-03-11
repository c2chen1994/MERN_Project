const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");
const keys = require("../config/keys");

const mongoConnection = mongoose.createConnection(keys.mongoURI);
autoIncrement.initialize(mongoConnection);

const imageSchema = new Schema({
  img: { data: Buffer, contentType: String }
});

imageSchema.plugin(autoIncrement.plugin, "image");
mongoose.model("image", imageSchema);

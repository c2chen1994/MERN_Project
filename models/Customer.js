const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");
const keys = require("../config/keys");

const mongoConnection = mongoose.createConnection(keys.mongoURI);
autoIncrement.initialize(mongoConnection);

const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  sex: String,
  email: String
});

customerSchema.plugin(autoIncrement.plugin, "customer");
mongoose.model("customer", customerSchema);

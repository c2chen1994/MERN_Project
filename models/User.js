const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const { Schema } = mongoose;
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new Schema({
  googleId: String,
  githubId: String,
  facebookId: String,
  linkedinId: String,
  twitterId: String
  //qqId: String
});

userSchema.plugin(findOrCreate);

mongoose.model("users", userSchema);

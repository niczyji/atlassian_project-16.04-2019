var mongoose = require("mongoose");
var Schema = mongoose.Schema;

Profile = new Schema({
  name: String,
  salary: Number,
  age: Number
});
module.exports = mongoose.model("Users", Profile);

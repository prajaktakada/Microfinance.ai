const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  train: {type: mongoose.Schema.Types.ObjectId,ref: "train"},
  user: {type: mongoose.Schema.Types.ObjectId,ref: "user"},
  isDeleted : {type:Boolean,default:null}
});

module.exports = mongoose.model("book", bookSchema);
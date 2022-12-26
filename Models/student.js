const mongoose = require("mongoose");

const userSchema  = mongoose.Schema({
    name:String,
    classId:String
})

const student = new mongoose.model("student",userSchema);

module.exports = student;
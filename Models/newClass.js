const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
    class:String,
    studentsCount:Number
})

const newClass = mongoose.model("classes",classSchema)

module.exports = newClass
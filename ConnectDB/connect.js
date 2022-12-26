const mongoose = require("mongoose")

const connectDB= async ()=>{
    mongoose.set("strictQuery",false)
    return mongoose.connect("mongodb://127.0.0.1:27017/class").then(()=>{
        console.log("Connected to Db")
    }).catch(e=>{
        console.log(e.message);
    })
}

module.exports = connectDB;
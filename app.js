const express = require("express");
const cors = require("cors");
const connect =require("./ConnectDB/connect")
const route = require("./Routes/route")
const app= express();
app.use(express.json());
app.use("/",route)

app.listen(3000,async ()=>{
    await connect()
    console.log("Server is up at 3000")
})
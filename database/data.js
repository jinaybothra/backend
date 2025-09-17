const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbConnection = async ()=>{
    try{
        await mongoose.connect(MONGODBURL);
    }
    catch{
        console.log("Error while connecting to Database");
    }
}
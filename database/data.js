const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGODBURL = process.env.MONGODBURL;
const dbConnection = async ()=>{
    try{
        await mongoose.connect(MONGODBURL);
    }
    catch{
        console.log("Error while connecting to Database");
    }
}
module.exports = {dbConnection};
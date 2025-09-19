const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGODBURL = process.env.MONGODBURL;
const dbConnection = async ()=>{
    try{
        await mongoose.connect(MONGODBURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    catch{
        console.log("Error while connecting to Database");
        process.exit(1);
    }
}
module.exports = {dbConnection};
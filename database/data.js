const mongoose = require("mongoose");

const dbConnection = async ()=>{
    try{
        await mongoose.connect(MONGODBURL);
    }
    catch{
        console.log("Error while connecting to Database");
    }
}
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const User = require("./models/User")
const { dbConnection } = require("./database/data")

dbConnection();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("./", (req, res)=>{
res.send("Hello World")
})
app.post("./register", async (req,res)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if(!name || !email || !password)
        {
            res.status(400).send("Please enter all information");
        }
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }

        const saltingRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltingRounds);
    }
    catch(error){
        console.log("Error while registration :", error);
    }
})

app.listen(3000, ()=>{
    console.log("Server is running on port")
})
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

        const User = await User.create({
            name: name.trim(),
            email: email.trim(),
            password: hashedPassword.trim()
        })

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email
            },
            process.env.MONGOURL,
            {
                expiresIn: '24h'
            })

        const cookieOption = {
            expires: new Date(Date.now() + 24*60*60*1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }

        res.status(201).json({
            success: true,
            message: "Registration is successfull",
            user: userResponse,
            token: token
        })
    }
    catch(error){
        console.log("Error while registration :", error);
        if(error.code === 11000){
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }

        if(error.name === 'ValidationError'){
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            })
        }
    }
})

app.listen(3000, ()=>{
    console.log("Server is running on port")
})
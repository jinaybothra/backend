const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("./", (req, res)=>{
res.send("Hello World")
})
app.post("./register", (req,res)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if(!name && email && password)
        {
            res.status(400).send("Please enter name");
        }
    }
    catch{
        console.log("Error while fetching")
    }
})

app.listen(3000, ()=>{
    console.log("Server is running on port")
})
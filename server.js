const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images"});

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/index.html");
});

let jewels =[{
    _id:1,
    name: "Engagement Ring",
    description: "This is something the love of you life will never forget, " +
    "never take for granted, and treasure you forever with",
    rating:4,
    materials: [
        "gold",
        "diamonds",
        "emeralds"
    ]
},
{
    _id:2,
    name: "Necklace",
    description: "Give that special someone something they'll wear proudly at the envy " +
    "of all their friends",
    rating:3,
    materials: [
        "silver",
        "diamonds",
        "gold"
    ]  
},
{
    _id:3,
    name: "Bracelet",
    description: "A real closer when it comes to an outfit, and a perfect"  +
    " gift for that special occasion",
    rating:5,
    materials: [
        "platinum",
        "saphires",
        "diamonds"
    ]   
}];

app.get("/api/jewelry", (req, res)=>{
    res.send(jewels)
});

app.listen(3000, ()=>{
    console.log("listening server.js");
});



const validateThings = (jewel) => {
    const schema = Joi.object({
        _id:Joi.allow(""),//nothing
        materials:Joi.allow(""),
        name:Joi.string().min(1).required(),//needs to be a string at least 3 characters
        description:Joi.string().min(3).required()
    });
    return schema.validate(jewel);
};


app.post("/api/jewelry", upload.single("img"),(req, res) =>{
    console.log("in post");
    const result = validateThings(req.body);
    
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    console.log(req.body);
    const jewel = {
        _id: jewels.length + 1,
        name: req.body.name,
        description: req.body.description,
        materials:req.body.materials.split(",")
    }
  

    jewels.push(jewel);
    
    res.send(jewel);
});



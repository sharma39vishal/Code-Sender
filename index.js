const express = require("express");
const dotenv = require('dotenv').config();
const app= express();
const mongoose=require('mongoose');
const URI = process.env.MONGODB_URL;
app.use(express.json())
app.use(express.urlencoded())

mongoose.connect(URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
},() => {
    console.log("Database connected")
})

const codeSchema = new mongoose.Schema({
    title:String,
    username:String,
    code:String
})
const Code = new mongoose.model("Code", codeSchema)

app.get('/getcodes',(req, res)=>{
    Code.find(function(err,Code) {
        if (err) {
            console.log(err);
        } else {
            // console.log("get codes");
            res.json(Code);
        }
    });
}); 

app.post("/addcode", (req, res)=> {
    const { title,username,code} = req.body
            const ncode = new Code({
                title,
               username,
               code
            })
            ncode.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Content Was Uploaded" })
                }
            })        
})

app.post("/deletecode", (req, res)=> {
    const {title} = req.body
            Code.deleteOne({title:title}, (err,result)=>{
                if (err) {
                  res.send(err);
                } else {
                  res.json(result);
                }
        });
})


const PORT=process.env.PORT||5000;

// to deploy
// if(process.env.NODE_ENV=="production"){
    app.use(express.static("build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve('build','index.html'));
    })
// }

app.listen(PORT,() => {
    console.log('Backend was connected at port ',PORT);
})
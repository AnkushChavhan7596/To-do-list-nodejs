const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const port = process.env.PORT || 3000;

// ================= database =============
const mongoose = require('./db/database');

// ================ models ===============
const todoSchema = require("./model/todoModel");

// ================ static paths ===========
const static_path = path.join(__dirname,"../public");
const views_path = path.join(__dirname,"../templates/views");

app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(static_path));
app.set("views",views_path);

// ================ Routes =================

// --------------- Saving data to the database
app.post("/add", async(req, res)=>{
    try{
        const data = new todoSchema({
            task : req.body.task
        });

        const post = await data.save();

        if(!post) throw Error("Something wents wrong !!");

        res.redirect("/");
    }
    catch(err){
        console.log(err);
    }
})


// --------------- Getting data from the database
app.get("/", async(req, res)=>{
    try{
        const todoData = await todoSchema.find();

        if(!todoData) throw Error("Something wents wrong !!");

        res.render("index",{
            "data" : todoData
        })
    }
    catch(err){
        console.log(err);
    }
})

// --------------- Update the data
app.get("/update/:id", async(req, res)=>{   
    try{
         const data = await todoSchema.findById(req.params.id);     // getting data to update

         if(!data) throw Error("Something wents wrong !!");

         res.render("update",{"data":data});
    }
    catch(err){
        console.log(err);
    }
})


// update the item
app.post("/update_item/:id", async(req, res)=>{
    try{
        const data = await todoSchema.findByIdAndUpdate(req.params.id, {task : req.body.task});   // actual updation
         
        if(!data) throw Error("Something wents wrong !!");

        res.redirect("/");
    }
    catch(err){
        console.log(err);
    }
})

// check
app.get("/checked/:_id", async(req, res)=>{
    try{
        const data = await todoSchema.findById(req.params.id);
        if(!data) throw Error("Something wents wrong !!");

        const post = await todoSchema.findByIdAndUpdate(req.params.id, {task: `<del>${data.task}</del>`});
        if(!post) throw Error("Something wents wrong !!");
    }
    catch(err){
        console.log(err);
    }
})


// --------------- deleting data
app.get("/delete/:id",async(req, res)=>{
    try{
        const data = await todoSchema.findByIdAndDelete(req.params.id);
        if (!data) throw Error("data not found !");
        res.redirect("/");
    }
    catch(err){
        console.log(err);
    }
})

app.get("/",(req, res)=>{
    res.render("index");
})

app.listen(port, ()=>{
    console.log(`Server listening on the port ${port}`);
})
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const data = new Schema({
    task : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("todo",data);
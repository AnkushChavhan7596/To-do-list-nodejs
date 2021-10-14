const mongoose = require('mongoose');

const {MONGO_URI} = require('../config');

mongoose.connect(MONGO_URI,({
    useNewUrlParser:true,
    useUnifiedTopology:true
}))
.then((res)=>{
    console.log("DB Connected !!");
})
.catch((err)=>{
    console.log(err);
})

module.exports = mongoose;
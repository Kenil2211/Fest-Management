const mongoose = require('mongoose');
const participationmodel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    iuno:{
      type:String,
      required:true
     
    },
    semester:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true
    },
    departement:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports = mongoose.model('participatns',participationmodel)

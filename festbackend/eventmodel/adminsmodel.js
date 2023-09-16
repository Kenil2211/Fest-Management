const mongoose = require('mongoose');

const festadmins = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
})

module.exports = mongoose.model('festadmins',festadmins)

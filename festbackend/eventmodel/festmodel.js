const mongoose = require('mongoose');


const festSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Organizedby: {
    type: String,
    required: true
  },
  image: {
    type: String,
    //required:true
  },
  description: {
    type: String,
  },
  venue: {
    type: String,
    required: true
  },
  date_of_event: {
    type: String,
    required: true,
  },
  
  enrolled_students:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'participatns',
    unique:true,
  }],

  first_winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'participatns',
    default:null
  },
  second_winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'participatns',
    default:null
  },
  third_winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'participatns',
    default:null
  }


}, { timestamps: true });

module.exports = mongoose.model('currentfest', festSchema)
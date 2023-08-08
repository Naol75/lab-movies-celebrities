const mongoose = require('mongoose');


const Movie = require('../models/Movie.model');



const celebritySchema = new mongoose.Schema({
   name: String,
   ocuppation: String,
   catchPhrase: {
    type: String, 
    required: true,
   } 
})

const Celebrity = mongoose.model('Celebrity', celebritySchema)





module.exports = Celebrity;

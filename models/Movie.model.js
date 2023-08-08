const mongoose = require('mongoose');


const Celebrity = require('../models/Celebrity.model');



const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Celebrity"
    }]
})

const Movie = mongoose.model('Movie', movieSchema)






module.exports = Movie;
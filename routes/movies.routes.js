const express = require('express');
const router = require("express").Router();
const Movie = require('../models/Movie.model.js');
const Celebrity = require('../models/Celebrity.model.js');

router.get('/', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies', {movies})
        console.log(movies)
    } catch (error) {
        next(error)
    }

})

router.get('/create', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find()
        res.render('movies/new-movie.hbs', {celebrities})
        console.log(celebrities)
    } catch (error) {
       next(error) 
    }
})

router.post('/create', async (req, res, next) => {
    try {
        console.log(req.body)
        const {title, genre, plot, cast} = req.body 
        await Movie.create({title, genre, plot, cast})
        res.redirect('/movies')
        
    } catch (error) {
        next(error)
    }
})


module.exports = router;
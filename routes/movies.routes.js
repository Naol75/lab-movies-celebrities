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


router.get('/:id', async (req, res, next) => {
    console.log(req.params)

    try {
        
        const movie = await Movie.findById(req.params.id)
        .populate('cast');

        res.render('movies/movie-details', {movie})

    } catch (error) {
        next(error)
    }
})

//Delete a specific movie
router.post('/:id/delete', async (req, res, next) => {
    try {
      await Movie.findByIdAndRemove(req.params.id)
      res.redirect('/movies')
      console.log("película eliminada")
    } catch (error) {
      next(error)
    }
})


router.get('/:id/edit', async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      const celebrities = await Celebrity.find();
      res.render('movies/edit-movie', { movie, celebrities });
    } catch (error) {
      console.error(error);
    }
  });


  
router.post('/:id/edit', async (req, res) => {
    try {
      const { title, genre, plot, cast } = req.body;
      await Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast });
      res.redirect(`/movies/${req.params.id}`);
    } catch (error) {
      console.error(error);
    }
  });


  module.exports = router;
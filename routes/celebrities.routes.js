const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model.js')





router.get('/', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/celebrities', {celebrities})
        console.log(celebrities)
    } catch (error) {
        next(error)
    }

})




//Show a form to create a celebrity
router.get('/create', (req, res) => {
    console.log(res)
    res.render('celebrities/new-celebrity')
})

router.post('/create', async (req, res, next) => {
    try {
        const { name, occupation, catchPhrase } = req.body
        console.log(req.body)
       await Celebrity.create({
            name,
            occupation,
            catchPhrase,
       })

       res.redirect('/celebrities')

    } catch (error) {
        res.render('celebrities/new-celebrity')
    }
})








module.exports = router;
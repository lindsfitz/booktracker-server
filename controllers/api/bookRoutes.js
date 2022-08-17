const express = require('express')
const router = express.Router()
const { Book } = require('../../models')


// get all route for testing 

router.get('/', (req, res) => {
    Book.findAll().then(books => {
        res.json(books)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})


// post route for new books --- check to see if exists before actually adding a new one 


module.exports = router
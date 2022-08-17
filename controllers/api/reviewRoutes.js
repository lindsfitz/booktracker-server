const express = require('express')
const router = express.Router()
const { Book, Shelf, Review } = require('../../models')


router.get('/', (req, res) => {
    Review.findAll().then(review => {
        res.json(review)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// get route for all reviews based on book id

// get route for all reviews based on user id 

// post route for new review (must include book id and user id)

// put route to update review

// delete route to remove review 


module.exports = router
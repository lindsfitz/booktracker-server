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

router.get('/bk/:id', (req,res) => {
    Review.findAll({
        where:{
            BookId: req.params.id
        }
    }).then(reviews => {
        res.json(reviews)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// get route for all reviews based on user id 

router.get('/usr/:id', (req,res) => {
    Review.findAll({
        where:{
            UserId: req.params.id
        }
    }).then(reviews => {
        res.json(reviews)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})


router.get('/:uid/:bid', (req,res) => {
    Review.findAll({
        where:{
            UserId: req.params.uid,
            BookId: req.params.bid
        }
    }).then(reviews => {
        res.json(reviews)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// post route for new review (must include book id and user id)

router.post('/new', (req,res) => {
    Review.create({...req.body})
    .then(review => {res.json(review)})
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})

// put route to update review

// delete route to remove review 


module.exports = router
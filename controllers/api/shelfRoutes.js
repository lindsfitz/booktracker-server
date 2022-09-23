const express = require('express')
const router = express.Router()
const { Shelf, Book } = require('../../models')


// get all shelves by one user based on user id 

router.get('/all/:id', (req,res) => {
    Shelf.findAll({
        where: {
            userId: req.params.id
        },
        order:[['updatedAt','DESC']],
        include: [{
            model:Book
        }]
    })
    .then(shelves => res.json(shelves))
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})

// get one shelf based on shelf id

router.get('/one/:id', (req,res) => {
    Shelf.findByPk(req.params.id
        , {
        include: [{
            model:Book
        }]
    })
    .then(shelf => res.json(shelf))
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})

// post route for new shelf

router.post('/new', (req,res) => {
    Shelf.create({
        ...req.body,
        last_update: new Date(),
    })
    .then(shelf => {res.json(shelf)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// put route for updating name/description on shelf

router.put('/update/:id', (req,res) => {
    Shelf.update({
        ...req.body,
        last_update: new Date(),
    }, {
        where:{
            id:req.params.id
        }
    }).then(data => {
        res.json('shelf updated')
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// delete route to remove shelves 

router.delete('/delete/:id', (req,res) => {
    Shelf.destroy({
        where:{
            id:req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

module.exports = router
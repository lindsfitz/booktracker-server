const express = require('express')
const router = express.Router()
const { Book, Shelf, Review, User, Note } = require('../../models')


// all users reviews on one specific book 
router.get('/:uid/:bid', (req, res) => {
    Note.findAll({
        where: {
            UserId: req.params.uid,
            BookId: req.params.bid
        },
        order: [['updatedAt', 'DESC']]
    }).then(notes => {
        res.json(notes)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// post route for new NOTE (must include book id and user id)
router.post('/new', (req, res) => {
    Note.create({
        ...req.body
    })
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})


// put route to update note
router.put('/update/:id', (req, res) => {
    Note.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json('note updated')
    }).catch(err => {
        console.log(err)
        res.json(err)
    })

})

// delete route to remove review 
router.delete('/delete/:id', (req, res) => {
    Note.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})


module.exports = router;
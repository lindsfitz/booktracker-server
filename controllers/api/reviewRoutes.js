const express = require('express')
const router = express.Router()
const { Book, Shelf, Review, User } = require('../../models')


router.get('/', (req, res) => {
    Review.findAll().then(review => {
        res.json(review)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// get route for all reviews based on book id

// router.get('/bk/:id', (req, res) => {
//     Review.findAll({
//         where: {
//             BookId: req.params.id
//         }
//     }).then(reviews => {
//         res.json(reviews)
//     }).catch(err => {
//         console.log(err)
//         res.json(err)
//     })
// })

// get route for all reviews based on user id 

router.get('/usr/:id', (req, res) => {
    Review.findAll({
        where: {
            UserId: req.params.id
        }
    }).then(reviews => {
        res.json(reviews)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// all users reviews on one specific book 
router.get('/:uid/:bid', (req, res) => {
    Review.findAll({
        where: {
            UserId: req.params.uid,
            BookId: req.params.bid
        },
        order: [['updatedAt', 'DESC']]
    }).then(reviews => {
        res.json(reviews)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// post route for new review (must include book id and user id)

router.post('/new/note', (req, res) => {
    Review.create({
        read: false,
        ...req.body
    })
        .then(review => {
            res.json(review)
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

router.post('/new/review', (req, res) => {
    Review.create({
        read: true,
        ...req.body
    })
        .then(review => {
            User.findByPk(req.body.UserId).then(async user => {
                try { await user.addRead(req.body.BookId) }
                catch (err) { console.log(err) }
                res.json(review)
            })
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// put route to update review
router.put('/update/:id', (req, res) => {
    Review.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json('review updated')
    }).catch(err => {
        console.log(err)
        res.json(err)
    })

})

// delete route to remove review 
router.delete('/delete/:id', (req, res) => {
    Review.destroy({
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

module.exports = router
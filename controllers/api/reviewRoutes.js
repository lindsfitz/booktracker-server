const express = require('express')
const router = express.Router()
const { Book, Shelf, Review, User, Profile } = require('../../models')
const sequelize = require('../../config/connection')



// get route for all PUBLIC reviews based on book id

router.get('/public/:id', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);

        const avgRating = await book.getReviews({
            where: {
                public: true
            },
            attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'avgRating'], [sequelize.fn('count', sequelize.col('id')), 'count']],
        })

        const reviews = await book.getReviews({
            where: {
                public: true
            },
            attributes: [
                'id', 'public', 'date_started', 'date_finished', 'rating', 'review', 'createdAt', 'BookId', [sequelize.col('User.Profile.id'), 'ProfileId'],[sequelize.col('User.Profile.display_name'), 'ProfileName']
            ],
            include: [
                {
                    model: User,
                    attributes: [],
                    include: {
                        model: Profile,
                        attributes: []
                    }
                }
            ]
        })

        if (!reviews.length) {
            return res.json(null)
        }

        res.json({
            title: book.title,
            avg: avgRating[0], reviews
        })

    } catch (error) {
        console.log(error)
        res.json(error)
    }
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



// post route for new REVIEW -- read:true ALWAYS (must include book id and user id)
router.post('/new', (req, res) => {
    Review.create({
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
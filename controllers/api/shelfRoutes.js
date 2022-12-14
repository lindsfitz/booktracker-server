const express = require('express')
const router = express.Router()
const { Shelf, Book, User, Tag, Profile } = require('../../models')
const sequelize = require('../../config/connection')


/* get all shelves by one user based on user id -- currently being used on front end when new shelf is added to pull all shelves & update context */
router.get('/all/:id', (req, res) => {
    Shelf.findAll({
        where: {
            userId: req.params.id
        },
        order: [['updatedAt', 'DESC'], [sequelize.col('Books.bookshelf.createdAt'), 'DESC']],
        include: [Book, Tag]
    })
        .then(shelves => res.json(shelves))
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})


/* Used to pull all data about one shelf & all associated books + their associated data for the single Shelf by id page */
router.get('/userone/:shelfid/:userid', (req, res) => {
    Shelf.findByPk(req.params.shelfid
        , {
            order: [[sequelize.col('Books.bookshelf.createdAt'), 'DESC']],
            include:
                [{
                    model: Book,
                    attributes: ['id', 'title', 'author', 'author_key', 'cover_img'],
                    include: [
                        {
                            model: Shelf,
                            where: {
                                UserId: req.params.userid
                            },
                            attributes: ['name'],
                            required: false,
                            through: {
                                attributes:['createdAt']
                            }
                        },
                        {
                            model: User,
                            as: 'CurrentBooks',
                            where: {
                                id: req.params.userid
                            },
                            attributes: ['id'],
                            through: {
                                attributes: []
                            },
                            required: false
                        },
                        {
                            model: User,
                            as: 'OwnedBooks',
                            where: {
                                id: req.params.userid
                            },
                            attributes: ['id'],
                            through: {
                                attributes: []
                            },
                            required: false
                        },
                        {
                            model: User,
                            as: 'DNFBooks',
                            where: {
                                id: req.params.userid
                            },
                            attributes: ['id'],
                            through: {
                                attributes: []
                            },
                            required: false
                        },
                        {
                            model: User,
                            as: 'ReadBooks',
                            where: {
                                id: req.params.userid
                            },
                            attributes: ['id'],
                            through: {
                                attributes: []
                            },
                            required: false
                        },

                    ]
                }, {
                    model: Tag,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }]
        })
        .then(shelf => res.json(shelf))
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

router.get('/search/:username', async (req,res) => {
    try {
        const profile = await Profile.findOne({
            where: {
                username: req.params.username
            },
            attributes:[],
            order: [[User, Shelf, 'updatedAt', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['id'],
                    include: [{
                        model: Shelf,
                        where: {
                            public: true
                        },
                        attributes:['id','name','updatedAt'],
                        include: [{
                            model:Tag,
                            attributes:['id', 'name'],
                            through:{
                                attributes:[]
                            }
                        }]
                    }]
                }
            ]
        })
        res.json(profile)
    } catch (error) {
       console.log(error)
       res.json(error) 
    }
})

/* Adds new shelf */
router.post('/new', (req, res) => {
    Shelf.create({
        ...req.body,
        last_update: new Date(),
    })
        .then(shelf => {
            res.json(shelf)
        }).catch(err => {
            console.log(err)
            res.json(err)
        })
})


/* Can edit existing shelf - can change name, description, 'public' */
router.put('/update/:id', (req, res) => {
    Shelf.update({
        ...req.body,
        last_update: new Date(),
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json('shelf updated')
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})


/* Deletes existing shelf by id */
router.delete('/delete/:id', (req, res) => {
    Shelf.destroy({
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




/* --- NOT CURRENTLY BEING USED - get one shelf based on shelf id & associated books (no extra book info included. Keep for dev testing purposes but can remove from front end API file) */
// router.get('/one/:id', (req, res) => {
//     Shelf.findByPk(req.params.id
//         , {
//             include: [{
//                 model: Book
//             }]
//         })
//         .then(shelf => res.json(shelf))
//         .catch(err => {
//             console.log(err)
//             res.json(err)
//         })
// })

module.exports = router
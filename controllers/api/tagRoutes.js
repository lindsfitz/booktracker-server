const express = require('express')
const router = express.Router()
const { Book, Tag, Shelf, Profile } = require('../../models')
const { Op } = require("sequelize");




// GET ALL TAGS 
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.findAll()
        res.json(tags)
    } catch (err) {
        console.log(err)
        res.json(err)

    }
})

// ADD A TAG 
router.post('/', async (req, res) => {
    try {
        const newTag = await Tag.create(req.body)
        res.json(newTag)
    } catch (err) {
        console.log(err)
        res.json(err)

    }
})

// DELETE A TAG 
router.delete('/:id', async (req, res) => {
    try {
        const destroy = await Tag.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ destroy, message: 'tag removed' })
    } catch (err) {

    }
})


// ALL BOOKS W ONE TAG 
router.get('/books/:id', async (req, res) => {
    try {
        const books = await Book.findAll({
            where: {
                '$Tags.id$': req.params.id
            },
            include: [{
                model: Tag,
                through: {
                    attributes: []
                }
            }]
        })

        res.json(books)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})


// ADD NEW TAG TO A BOOK 
router.post('/book', async (req, res) => {
    try {
        const book = await Book.findByPk(req.body.bookId)
        book.addTag(req.body.tagId)

        res.json({ message: 'tag added to book!' })
    } catch (err) {
        res.json(err)
    }

})

// REMOVE TAG FROM BOOK 
router.delete('/book/:bookId/:tagId', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.bookId)
        book.removeTag(req.params.tagId)

        res.json({ message: 'tag removed from book!' })
    } catch (err) {
        res.json(err)
    }
})



// ALL !!PUBLIC!! SHELVES W ONE TAG (add shelf-tag association )
// Results exclude any shelves made by logged in user !!! 
router.get('/shelves/:id/:userId', async (req, res) => {
    try {
        const shelves = await Shelf.findAll({
            where: {
                UserId: { 
                    [Op.ne]: req.params.userId 
                },
                public: true,
                '$Tags.id$': req.params.id,
            },
            include: [{
                model: Tag,
                through: {
                    attributes: []
                }
            }]
        })

        res.json(shelves)
    } catch (err) {
        res.json(err)
    }
})

// ADD TAG TO SHELF 
router.post('/shelf', async (req, res) => {
    try {
        const shelf = await Shelf.findByPk(req.body.shelfId)
        shelf.addTag(req.body.tagId)

        res.json({ message: 'tag added to shelf!' })
    } catch (err) {
        res.json(err)
    }

})

// REMOVE TAG FROM SHELF 
router.delete('/shelf/:shelfId/:tagId', async (req, res) => {
    try {
        const shelf = await Shelf.findByPk(req.params.shelfId)
        shelf.removeTag(req.params.tagId)

        res.json({ message: 'tag removed from shelf!' })
    } catch (err) {
        res.json(err)
    }
})


// ALL !!PUBLIC!! PROFILES W ONE TAG 
// Results exclude profile of logged in user !!! 
router.get('/profiles/:id/:userId', async (req, res) => {
    try {
        const profiles = await Profile.findAll({
            where: {
                UserId: { 
                    [Op.ne]: req.params.userId 
                },
                public: true,
                '$Tags.id$': req.params.id
            },
            include: [{
                model: Tag,
                through: {
                    attributes: []
                }
            }]
        })

        res.json(profiles)
    } catch (err) {
        res.json(err)
    }
})

// ADD TAG TO PROFILE 
router.post('/profile', async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.body.profileId)
        profile.addTag(req.body.tagId)

        res.json({ message: 'tag added to profile!' })
    } catch (err) {
        res.json(err)
    }

})

// REMOVE TAG FORM PROFILE 
router.delete('/profile/:profileId/:tagId', async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.profileId)
        profile.removeTag(req.params.tagId)

        res.json({ message: 'tag removed from profile!' })
    } catch (err) {
        res.json(err)
    }
})




module.exports = router
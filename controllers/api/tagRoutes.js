const express = require('express')
const router = express.Router()
const { Book, Tag, Shelf } = require('../../models')
const sequelize = require('../../config/connection')



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
router.delete('/:id', async (req,res) => {
    try {
        const destroy = await Tag.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({destroy, message: 'tag removed'})
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

// REMOVE TAG FROM BOOK 



// ALL !!PUBLIC!! SHELVES W ONE TAG (add shelf-tag association )

// ADD TAG TO SHELF 

// REMOVE TAG FROM SHELF 


// ALL !!PUBLIC!! PROFILES W ONE TAG 

// ADD TAG TO PROFILE 

// REMOVE TAG FORM PROFILE 




module.exports = router
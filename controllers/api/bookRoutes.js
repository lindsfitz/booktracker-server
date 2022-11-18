const express = require('express')
const router = express.Router()
const { Book, Review, Shelf, User, Note } = require('../../models')
const sequelize = require('../../config/connection')


// get all route for testing 
router.get('/', (req, res) => {
    Book.findAll().then(books => {
        res.json(books)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})


// one book for testing -- literally just book info by itself (maybe use for non-logged in users?)
router.get('/one/:id', (req, res) => {
    Book.findByPk(req.params.id)
        .then(book => { res.json(book) })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// check for book by ID & check for book by title & author 
router.put('/bookcheck/:id', async (req, res) => {
    try {
        const bookById = await Book.findByPk(req.params.id)
        const bookByData = await Book.findOne({
            where: {
                title: req.body.title,
                author: req.body.author
            }
        })

        if (bookById) {
            return res.status(200).json(bookById)
        }

        if (bookByData) {
            return res.status(200).json(bookByData)
        }

        return res.json('book does not exist')

    }

    catch (err) {
        console.log(err)
        res.json(err)
    }

})



// get one book for userbook page, include books associated shelves & if currently reading
router.get('/one/:bookid/:userid', (req, res) => {
    Book.findOne({
        where: {
            id: req.params.bookid
        },
        include: [{
            model: Shelf,
            where: {
                UserId: req.params.userid
            },
            required: false
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
        {
            model: Review,
            where: {
                UserId: req.params.userid
            },
            required: false
        },
        {
            model: Note,
            where: {
                UserId: req.params.userid
            },
            required: false
        },


        ]
    })
        .then(book => { res.json(book) })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})



// post route for new books --- check to see if exists before actually adding a new one 
router.post('/new', async (req, res) => {
    try {
        const bookCheck = await Book.findOne({
            where: {
                title: req.body.title,
                author: req.body.author
            }
        })
        console.log(bookCheck)

        if (bookCheck) {
            return res.json(bookCheck)
        }

        const newBook = await Book.create({ ...req.body })

        res.status(200).json(newBook)
    }
    catch (error) {
        console.log(error)
        res.json(error)
    }

})

// add a book to an existing shelf
// also updates the 'last updated' column in shelf -- shelves sorted on main page by the most recently updated
router.post('/addto/:shelfid', async (req, res) => {
    try {
        const book = await Book.findByPk(req.body.id)
        await book.addShelf(req.params.shelfid)
        await Shelf.update({
            last_update: new Date()
        },
            {
                where: {
                    id: req.params.shelfid,
                }
            })
        return res.json({ message: 'added book to shelf!' })
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

// DELETE route to remove a book from a shelf
router.delete('/remove/:shelfid/:bookid', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.bookid)
        await book.removeShelf(req.params.shelfid)
        return res.json({ message: 'removed book from shelf!' })
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const book = await Book.destroy({
            where: { id: req.params.id }
        })
        res.json(book)
    }
    catch (err) {
        console.log(err)
        res.json(err)
    }
});


module.exports = router
const express = require('express')
const router = express.Router()
const { Book, Review, Shelf } = require('../../models')
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


// one book for testing 
router.get('/one/:id', (req, res) => {
    Book.findByPk(req.params.id)
        .then(book => { res.json(book) })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})



// post route for new books --- check to see if exists before actually adding a new one 
router.post('/new', async (req, res) => {
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

})


// add a book to an existing shelf

router.post('/addto/:shelfid', (req, res) => {
    Book.findByPk(req.body.id).then(async book => {
        await book.addShelf(req.params.shelfid)
        return res.json({ message: 'added book to shelf!' })
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// DELETE route to remove a book from a shelf

router.delete('/delete/:shelfid/:bookid', (req,res)=>{
    Book.findByPk(req.params.bookid).then(async book => {
        await book.removeShelf(req.params.shelfid)
        return res.json({ message: 'removed book from shelf!' }) 
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})



// ALL BOOKS associated w a user, on any shelf

router.get('/user/:id', async (req, res) => {
    Shelf.findAll({
        where: {
            userId: req.params.id
        }
    }).then(async shelves => {

        const userBooks = []

        for (const shelf of shelves) {
            const books = await shelf.getBooks({ joinTableAttributes: [], raw: true })
            for (const book of books) {
                userBooks.push(book)
            }
            
        }

        return res.status(200).json(userBooks)

    }).catch(err => {
        console.log(err)
        res.json(err)
    })


})



// LIST OF ALL USER BOOKS MARKED AS 'READ'
router.get('/read/:id', (req, res) => {
    Book.findAll({
        where: {
            '$Reviews.UserId$': req.params.id,
            '$Reviews.read$': true
        },
        order:[[Review, 'date_finished', 'DESC']],
        include: [{
            model: Review,
            attributes: []
        }]
    }).then(books => res.json(books))
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})



module.exports = router
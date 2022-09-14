const express = require('express')
const router = express.Router()
const { Book, Review, Shelf, User } = require('../../models')
const sequelize = require('../../config/connection')

// Add book to currently reading list 
router.post('/', (req, res) => {
    User.findByPk(req.body.userId).then(async user => {
        await user.addBook(req.body.bookId)
        return res.json({ message: 'added book to currently reading!' })
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// Get currently reading list for a user
router.get('/:id', (req, res) => {
    User.findByPk(req.params.id).then(async user => {
        const books = await user.getBooks({ joinTableAttributes: [], raw: true })
        return res.status(200).json(books)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

router.delete('/:userId/:bookId', (req, res) => {
    User.findByPk(req.params.userId).then(async user => {
        await user.removeBook(req.params.bookId)
        return res.json({ message: 'book has been removed from currently reading'})
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

router.post('/finishedreading', (req,res)=> {
    User.findByPk(req.body.UserId).then(async user => {
        await user.removeBook(req.body.BookId)
        const newReview = await Review.create({
            read: true,
            ...req.body
        })
        res.status(200).json(newReview)
    })
})



module.exports = router
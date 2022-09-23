const express = require('express')
const router = express.Router()
const { Book, Review, Shelf, User } = require('../../models')
const sequelize = require('../../config/connection')

// Add book to currently reading 
router.post('/', (req, res) => {
    User.findByPk(req.body.userId).then(async user => {
        await user.addCurrentRead(req.body.bookId)
        return res.json({ message: 'added book to currently reading!' })
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// Get all currently reading
router.get('/:id', (req, res) => {
    User.findByPk(req.params.id).then(async user => {
        const books = await user.getCurrentReads({ joinTableAttributes: [], raw: true })
        return res.status(200).json(books)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// Remove from currently reading entirely - not moving anywhere, just not reading it 
router.delete('/:userId/:bookId', (req, res) => {
    User.findByPk(req.params.userId).then(async user => {
        await user.removeCurrentRead(req.params.bookId)
        return res.json({ message: 'book has been removed from user book list'})
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// finished reading -- move from currently reading to read (by adding a review)
router.post('/finishedreading', (req,res)=> {
    User.findByPk(req.body.UserId).then(async user => {
        await user.removeCurrentRead(req.body.BookId)
        const newReview = await Review.create({
            read: true,
            ...req.body
        })
        res.status(200).json(newReview)
    })
})



module.exports = router
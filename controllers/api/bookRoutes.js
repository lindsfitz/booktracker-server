const express = require('express')
const router = express.Router()
const { Book } = require('../../models')


// get all route for testing 

router.get('/', (req, res) => {
    Book.findAll().then(books => {
        res.json(books)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

router.get('/one/:id', (req, res) => {
    Book.findByPk(req.params.id)
    .then(book => {res.json(book)})
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})

router.post('/new', async (req, res) => {
    const bookCheck = await Book.findOne({
            where: {
                title:req.body.title,
                author:req.body.author
            }
        })
    console.log(bookCheck)

    if(bookCheck){
        return res.json({message:'this book exists!'})
    }

    const newBook = await Book.create({...req.body})

    res.status(200).json(newBook)

})


// post route for new books --- check to see if exists before actually adding a new one 


module.exports = router
const express = require('express')
const router = express.Router()
const { Book, Review } = require('../../models')


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
        return res.json(bookCheck)
    }

    const newBook = await Book.create({...req.body})

    res.status(200).json(newBook)

})

router.post('/addto/:shelfid', (req,res)=>{
    Book.findByPk(req.body.id).then(async book => {
        await book.addShelf(req.params.shelfid)
        return res.json({message:'added book to shelf!'})
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})


// post route for new books --- check to see if exists before actually adding a new one 


module.exports = router
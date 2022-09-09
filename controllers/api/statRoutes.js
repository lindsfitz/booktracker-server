const express = require('express')
const router = express.Router()
const { Book, Review, Shelf } = require('../../models')
const sequelize = require('../../config/connection')

// ALL-TIME STATS -- RETURNS BOOKCOUNT, TOTALPAGES, AVG RATING for ALL user reviewed & read books

router.get('/read/:id', (req, res) => {
    Book.findAll({
        where: {
            '$Reviews.UserId$': req.params.id,
            '$Reviews.read$': true
        },
        attributes: [[sequelize.fn('count', sequelize.col('Book.id')), 'bookCount'], [sequelize.fn("sum", sequelize.col("pages")), 'totalPages']],
        include: [{
            model: Review,
            attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'avgRating']]
        }],
        group: ['Reviews.UserId'],
        raw: true
    }).then(books => res.json(books))
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})


// TOTAL BOOKS & PAGE # FOR ALL BOOKS ON USER SHELF -- Read & Unread 

router.get('/shelves/:id', (req, res) => {
    Shelf.findAll({
        where: {
            userId: req.params.id
        },
        group: ['UserId'],
        raw: true,
        attributes: ['UserId'],
        include: [{
            model: Book,
            attributes: [[sequelize.fn('count', sequelize.col('Books.id')), 'bookCount'],[sequelize.fn("sum", sequelize.col("Books.pages")), 'totalPages']],
            through: { attributes: [] }
        }],
    })
        .then(shelves => res.json(shelves))
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})


// bookcount, pages, avg rating for this year so far
router.get('/year/:id',(req,res) => {
    
})

// bookcount, pages, avg rating for this month so far
router.get('/month/:id', (req,res) => {

})

router.get('/rating/:id', (req, res) => {
    Review.findAll({
        where: {
            UserId: req.params.id,
            read: true
        },
        attributes: ['UserId',[sequelize.fn('count',sequelize.col('id')),'bookCount'],[sequelize.fn('avg',sequelize.col('rating')),'avgRating']],
        group:['UserId'],
        raw:true
    })
    .then(reviews => res.json(reviews))
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})








module.exports = router
const express = require('express')
const router = express.Router()
const { Book, Review, Shelf } = require('../../models')
const sequelize = require('../../config/connection')

// pulls all stats at once from db before sending response -- needs error handling when I have wifi 
//replace current year/month with actual values somehow (Date? not sure how to format)
router.get('/all/:id/:year/:month', async (req, res) => {

    let currentYear = 2022;
    let currentMonth = 7;

    const allRead = await Book.findAll({
        where: {
            '$Reviews.UserId$': req.params.id,
            '$Reviews.read$': true
        },
        attributes: [[sequelize.fn('count', sequelize.col('Book.id')), 'bookCount'], [sequelize.fn("sum", sequelize.col("pages")), 'totalPages'], [sequelize.fn('avg', sequelize.col('Reviews.rating')), 'avgRating']],
        include: [{
            model: Review,
            attributes: []
        }],
        group: ['Reviews.UserId'],
        raw: true
    })

    const allShelved = await Shelf.findAll({
        where: {
            userId: req.params.id
        },
        group: ['UserId'],
        raw: true,
        attributes: [[sequelize.fn('count', sequelize.col('Books.id')), 'bookCount'], [sequelize.fn("sum", sequelize.col("Books.pages")), 'totalPages']],
        include: [{
            model: Book,
            attributes: [],
            through: { attributes: [] }
        }],
    })

    const yearly = await Book.findAll({
        where: {
            '$Reviews.UserId$': req.params.id,
            '$Reviews.read$': true,
            '$Reviews.year_finished$': req.params.year
        },
        attributes: [[sequelize.fn('count', sequelize.col('Book.id')), 'bookCount'], [sequelize.fn("sum", sequelize.col("pages")), 'totalPages'], [sequelize.fn('avg', sequelize.col('Reviews.rating')), 'avgRating']],
        include: [{
            model: Review,
            attributes: []
        }],
        group: ['Reviews.UserId'],
        raw: true
    })

    const monthly = await Book.findAll({
        where: {
            '$Reviews.UserId$': req.params.id,
            '$Reviews.read$': true,
            '$Reviews.month_finished$': req.params.month
        },
        attributes: [[sequelize.fn('count', sequelize.col('Book.id')), 'bookCount'], [sequelize.fn("sum", sequelize.col("pages")), 'totalPages'], [sequelize.fn('avg', sequelize.col('Reviews.rating')), 'avgRating']],
        include: [{
            model: Review,
            attributes: []
        }],
        group: ['Reviews.UserId'],
        raw: true
    })

    const stats = {
        all: allRead[0],
        shelved: allShelved[0],
        year: yearly[0],
        month: monthly[0]
    }

    return res.status(200).json(stats)
})


// monthly stats & associated books 
router.get('/monthly/:month/:id', async (req, res) => {
    try {
        const monthly = await Book.findAll({
            where: {
                '$Reviews.month_finished$': req.params.month,
                '$Reviews.read$': true,
                '$Reviews.UserId$': req.params.id,
            },
            include: [{
                model: Review,
                attributes: []
            }]
        })

       return res.status(200).json(monthly)
    }
    catch (error) {
        console.log(error)
        res.json(error)
    }

})


// bookcount, pages, avg rating for this year so far
router.get('/yearly/:year/:id',(req,res) => {
    Book.findAll({
        where: {
            '$Reviews.UserId$': req.params.id,
            '$Reviews.read$': true,
            '$Reviews.year_finished$':req.params.year
        },
        include: [{
            model: Review,
            attributes: []
        }],
    }).then(books => res.json(books))
        .catch(err => {
            console.log(err)
            res.json(err)
        })

})


module.exports = router
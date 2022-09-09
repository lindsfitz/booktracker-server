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

router.post('/addto/:shelfid', (req, res) => {
    Book.findByPk(req.body.id).then(async book => {
        await book.addShelf(req.params.shelfid)
        return res.json({ message: 'added book to shelf!' })
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

router.get('/user/:id', async (req, res) => {
    Shelf.findAll({
        where: {
            userId: req.params.id
        }
    }).then(async shelves => {

        const userBooks = []

        const testBooks = []

        // const attempt = shelves.map(async shelf => {
        //     const books = await shelf.getBooks({ joinTableAttributes: [], raw: true })
        //     const single = books.map(book => {
        //         userBooks.push(book);
        //         return book;
        //     })
        //     return single;
        // })

        for (const shelf of shelves) {
            const books = await shelf.getBooks({ joinTableAttributes: [], raw: true })
            for (const book of books) {
                userBooks.push(book)
            }
            
        }

        // shelves.forEach(async shelf => {
        //     const books = await shelf.getBooks({ joinTableAttributes: [], raw: true })
        //     books.forEach(book => userBooks.push(book))
        // })

        // for (let i = 0; i < shelves.length; i++) {
        //     const element = shelves[i];

        //     let books = await element.getBooks({ joinTableAttributes: [], raw: true })


        //     for (let j = 0; j < books.length; j++) {
        //         const test = books[j];
        //         testBooks.push(test)
        //     }

        //     // userBooks.push(books)
        // }

        // console.log(attempt);
        console.log(userBooks);
        // console.log(userBooks)


        return res.status(200).json(userBooks)

    }).catch(err => {
        console.log(err)
        res.json(err)
    })


})


// ALL USER BOOKS -- currently still returns shelf object rather than just books 
router.get('/userbooks/:id', (req, res) => {
    Shelf.findAll({
        where: {
            userId: req.params.id
        },
        attributes: [],
        include: [{
            model: Book,
            right: true,
            through: { attributes: [] },
        }],
    })
        .then(shelves => res.json(shelves))
        .catch(err => {
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


// ALL-TIME STATS -- RETURNS BOOKCOUNT, TOTALPAGES, AVG RATING for ALL user reviewed & read books

router.get('/readstats/:id', (req, res) => {
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

/* get route for user stats -- query for total number of books/year 
aggregate in sequelize for total pages/year; 
total books/month; total pages/month 
average rating for those books for year/ avg rating for month 
Later adds: 
books/genre 
gender of authors 

Book.findAll({
  include:[
    model:Review,
    attributes:[[sequelize.fn("avg",sequelize.col("plot_rating")),"avgPlot"]]
  ]
})
*/

// TOTAL PAGE # FOR ALL BOOKS ON USER SHELF -- Read & Unread 

router.get('/stats/:id', (req, res) => {
    Shelf.findAll({
        where: {
            userId: req.params.id
        },
        group: ['UserId'],
        raw: true,
        attributes: ['UserId'],
        include: [{
            model: Book,
            attributes: [[sequelize.fn("sum", sequelize.col("Books.pages")), 'totalPages']],
            through: { attributes: [] },
            // include:[{
            //     model:Review,
            //     where: {
            // //         UserId: req.params.id,
            //         read:true
            //     },
            //     attributes:[[sequelize.fn("avg",sequelize.col("Books.Reviews.rating")), 'avgRating']]
            // }]
        }],
    })
        .then(shelves => res.json(shelves))
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// router.get('/stats/:id', (req, res) => {
//     Review.findAll({
//         where: {
//             UserId: req.params.id,
//             read: true
//         },
//         attributes: ['UserId',[sequelize.fn('count',sequelize.col('id')),'bookCount'],[sequelize.fn('avg',sequelize.col('rating')),'avgRating']],
//         group:['UserId'],
//         raw:true
//     })
//     .then(reviews => res.json(reviews))
//     .catch(err => {
//         console.log(err)
//         res.json(err)
//     })
// })


module.exports = router
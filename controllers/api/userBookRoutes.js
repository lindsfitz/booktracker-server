const express = require('express')
const router = express.Router()
const { Book, Review, Shelf, User } = require('../../models')
const sequelize = require('../../config/connection')

// Get all currently reading
router.get('/currentreads/:id', async (req, res) => {
    try {
        const books = await Book.findAll({
            where: {
                '$CurrentBooks.CurrentlyReading.UserId$': req.params.id
            },
            attributes: ['id', 'title', 'author', 'cover_img', 'pages'],
            order: [[sequelize.col('CurrentBooks.CurrentlyReading.createdAt'), 'DESC']],
            include: [{
                model: User,
                as: 'CurrentBooks',
                attributes: ['id'],
                through: {
                    attributes: ['createdAt']
                },
            },
            {
                model: Shelf,
                where: {
                    UserId: req.params.id
                },
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                },
                required: false
            },]
        })
        return res.status(200).json(books)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

// get ALL read books
router.get('/read/:id', (req, res) => {
    Book.findAll({
        where: {
            '$ReadBooks.MarkedRead.UserId$': req.params.id,
        },
        attributes: ['id', 'title', 'author', 'cover_img',],
        order: [[Review, 'date_finished', 'DESC'], [sequelize.col('ReadBooks.MarkedRead.createdAt'), 'DESC']
        ],
        include: [
            {
                model: User,
                as: 'ReadBooks',
                attributes: ['id'],
                through: {
                    attributes: ['createdAt']
                },
            }, {
                model: Review,
                attributes: ['date_started', 'date_finished', 'rating'],
                required: false
            },
            {
                model: Shelf,
                where: {
                    UserId: req.params.id
                },
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                },
                required: false
            },
        ]
    }).then(books => {
        res.json(books)
    })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// get ALL unfinished books -- get all 'DNF' books
router.get('/dnf/:id', async (req, res) => {
    try {
        const books = await Book.findAll({
            where: {
                '$DNFBooks.NotFinished.UserId$': req.params.id
            },
            attributes: ['id', 'title', 'author', 'cover_img',],
            order: [[sequelize.col('DNFBooks.NotFinished.createdAt'), 'DESC']],
            include: [{
                model: User,
                as: 'DNFBooks',
                attributes: ['id'],
                through: {
                    attributes: ['createdAt']
                },
            },
            {
                model: Shelf,
                where: {
                    UserId: req.params.id
                },
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                },
                required: false
            },]
        })
        return res.status(200).json(books)
    } catch (err) {
        console.log(err)
        res.json(err)
    }

})

// get ALL owned books -- all 'Owned' books
router.get('/owned/:id', async (req, res) => {
    try {
        const books = await Book.findAll({
            where: {
                '$OwnedBooks.OwnedItems.UserId$': req.params.id
            },
            attributes: ['id', 'title', 'author', 'cover_img'],
            order: [[sequelize.col('OwnedBooks.OwnedItems.createdAt'), 'DESC']],
            include: [{
                model: User,
                as: 'OwnedBooks',
                attributes: ['id'],
                through: {
                    attributes: ['createdAt']
                },
            },
            {
                model: Shelf,
                where: {
                    UserId: req.params.id
                },
                attributes: ['id', 'name'],
                through: {
                    attributes: []
                },
                required: false
            },]
        })
        return res.status(200).json(books)
    } catch (err) {
        console.log(err)
        res.json(err)
    }

})




// Add book to currently reading 
router.post('/add/currentread', async (req, res) => {
    try {
        const user = await User.findByPk(req.body.userId)
        await user.addCurrentRead(req.body.bookId)
        return res.json({ message: 'added book to currently reading!' })
    }
    catch (err) { console.log(err) }
})

// Add book to read list
router.post('/add/read', async (req, res) => {
    try {
        const user = await User.findByPk(req.body.userId)
        await user.addRead(req.body.bookId)
        return res.json({ message: 'added book to read list!' })
    }
    catch (err) { console.log(err) }

})

// post add book to dnf
router.post('/add/dnf', async (req, res) => {
    try {
        const user = await User.findByPk(req.body.userId)
        await user.addDNF(req.body.bookId)
        return res.json({ message: 'added book to did not finish!' })
    } catch (err) { console.log(err) }
})

// post add book to owned
router.post('/add/owned', async (req, res) => {
    try {
        const user = await User.findByPk(req.body.userId)
        await user.addOwned(req.body.bookId)
        return res.json({ message: 'added book to owned!' })
    }
    catch (err) {
        console.log(err)
        res.json(err)
    }
})

// Remove from currently reading entirely - not moving anywhere, removing CR association
router.delete('/delcurrentread/:userId/:bookId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        await user.removeCurrentRead(req.params.bookId)
        return res.json({ message: 'book has been removed from user book list' })
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

// delete remove from dnf - not moving anywhere, just removing DNF association 
router.delete('/deldnf/:userId/:bookId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        await user.removeDNF(req.params.bookId)
        return res.json({ message: 'book has been removed from did not finish list' })
    } catch (err) {
        console.log(err)
        res.json(err)
    }

})

// delete remove from owned -- removing Owned association 
router.delete('/delowned/:userId/:bookId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        await user.removeOwned(req.params.bookId)
        return res.json({ message: 'book has been removed from owned list' })
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

// Removes book from 'Read' list thru table -- what if there are other user reviews that mark the book as read? Are these deleted? Are they edited? What do we do here? 
// Does read t/f actually just let us know if the user added a note or a review? 
router.delete('/delread/:userId/:bookId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId)
        await user.removeRead(req.params.bookId)
        return res.json({ message: 'book has been removed from read list' })
    }
    catch (err) {
        console.log(err)
        res.json(err)
    }
})



// ALL USER BOOKS - CR, READ, OWNED, DNF, ON SHELVES 
router.get('/shelved/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['id'],
            include: [
                {
                    model: Book,
                    as: 'CurrentRead',
                    through: {
                        attributes: []
                    },
                },
                {
                    model: Book,
                    as: 'Read',
                    through: {
                        attributes: []
                    },

                }, {
                    model: Book,
                    as: 'Owned',
                    through: {
                        attributes: []
                    },
                }, {
                    model: Book,
                    as: 'DNF',
                    through: {
                        attributes: []
                    },
                },
                {
                    model: Shelf,
                    attributes: ['id'],
                    include: [{
                        model: Book,
                        through: {
                            attributes: []
                        },
                    }]
                }
            ]
        })
        let allBooks = [];

        user.CurrentRead.map(book => { allBooks.push(book) })

        user.Read.map(book => {
            allBooks.some(existing => existing.id === book.id) ? console.log('book exists') :
                allBooks.push(book)
        })

        user.Owned.map(book => {
            allBooks.some(existing => existing.id === book.id) ? console.log('book exists') :
                allBooks.push(book)
        })

        user.DNF.map(book => {
            allBooks.some(existing => existing.id === book.id) ? console.log('book exists') :
                allBooks.push(book)
        })

        user.Shelves.map(shelf => {
            shelf.Books.map(book => {
                allBooks.some(existing => existing.id === book.id) ? console.log('book exists') :
                    allBooks.push(book)
            })
        })

        res.json(allBooks)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})








module.exports = router
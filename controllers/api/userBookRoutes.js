const express = require('express')
const router = express.Router()
const { Book, Review, Shelf, User } = require('../../models')
const sequelize = require('../../config/connection')

// Get all currently reading
router.get('/currentreads/:id', (req, res) => {
    User.findByPk(req.params.id).then(async user => {
        const books = await user.getCurrentRead({ joinTableAttributes: [], raw: true })
        return res.status(200).json(books)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// get ALL unfinished books -- get all 'DNF' books
router.get('/dnf/:id', (req, res) => {
    User.findByPk(req.params.id).then(async user => {
        const books = await user.getDNF({ joinTableAttributes: [], raw: true })
        return res.status(200).json(books)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })

})

// get ALL owned books -- all 'Owned' books
router.get('/owned/:id', (req, res) => {
    User.findByPk(req.params.id).then(async user => {
        const books = await user.getOwned({ joinTableAttributes: [], raw: true })
        return res.status(200).json(books)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })

})

// Add book to currently reading 
router.post('/add/currentread', (req, res) => {
    User.findByPk(req.body.userId).then(async user => {
        await user.addCurrentRead(req.body.bookId)
        return res.json({ message: 'added book to currently reading!' })
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// finished reading -- move from currently reading to read (by adding a review)
router.post('/finishedreading', (req, res) => {
    User.findByPk(req.body.UserId).then(async user => {
        await user.removeCurrentRead(req.body.BookId)
        const newReview = await Review.create({
            read: true,
            ...req.body
        })
        res.status(200).json(newReview)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// post -- move from CR to DNF
router.post('/moveto/dnf', (req, res) => {
    User.findByPk(req.body.userId).then(async user => {
        await user.removeCurrentRead(req.body.bookId)
        await user.addDNF(req.body.bookId)
        res.status(200).json({ message: 'removed book from currently reading to DNF list'})
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// post add book to dnf
router.post('/add/dnf', (req, res) => {
    User.findByPk(req.body.userId).then(async user => {
        await user.addDNF(req.body.bookId)
        return res.json({ message: 'added book to did not finish!' })
    }).catch(err => {
        console.log(err)
        res.json(err)
    })

})

// post add book to owned
router.post('/add/owned', (req, res) => {
    // add book to OnShelf
    // add book to Owned
    User.findByPk(req.body.userId).then(async user => {
        await user.addOwned(req.body.bookId)
        return res.json({ message: 'added book to owned!' })
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// Remove from currently reading entirely - not moving anywhere, just not reading it 
router.delete('/delcurrentread/:userId/:bookId', (req, res) => {
    User.findByPk(req.params.userId).then(async user => {
        await user.removeCurrentRead(req.params.bookId)
        return res.json({ message: 'book has been removed from user book list' })
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// delete remove from dnf
router.delete('/deldnf/:userId/:bookId', (req, res) => {
    User.findByPk(req.params.userId).then(async user => {
        await user.removeDNF(req.params.bookId)
        return res.json({ message: 'book has been removed from did not finish list' })
    }).catch(err => {
        console.log(err)
        res.json(err)
    })

})

// delete remove from owned
router.delete('/delowned/:userId/:bookId', (req, res) => {
    // remove from OnShelf ??? not sure -- maybe check if 
    User.findByPk(req.params.userId).then(async user => {
        await user.removeOwned(req.params.bookId)
        return res.json({ message: 'book has been removed from owned list' })
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})





// ---- MAYBE? ----- 

// get ALL users books -- get all 'shelved' books or all books OnShelf
router.get('/shelved/:id', (req, res) => {
    User.findByPk(req.params.id).then(async user => {
        const books = await user.getOnShelf({ joinTableAttributes: [], raw: true })
        return res.status(200).json(books)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })

})



router.post('/add/onshelf', (req, res) => {
    User.findByPk(req.body.userId).then(async user => {
        await user.addOnShelf(req.body.bookId)
        return res.json({ message: 'added book to shelved list!' })
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})








module.exports = router
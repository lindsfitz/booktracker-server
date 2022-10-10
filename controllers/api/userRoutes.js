const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { User, Profile, Shelf } = require('../../models')
const jwt = require("jsonwebtoken");
const tokenAuth = require("../../middleware/tokenAuth")


router.get("/", (req, res) => {
    User.findAll().then(users => res.json(users)).catch(err => {
        console.log(err)
        res.json(err)
    })
})

router.get("/profile/:id", (req, res) => {
    Profile.findOne({
        where: {
            UserId: req.params.id
        }
    }).then(profile => {
        res.json(profile)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// post route for new users 
router.post("/signup", (req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_login: new Date()
    }).then(async (newUser) => {
        try {
            await Profile.create({
                username: req.body.username,
                UserId: newUser.id
            })
            await Shelf.create({
                name: "Want To Read",
                last_update: new Date(),
                UserId: newUser.id
            })
            res.json(newUser)
        }
        catch (err) { console.log(err) }
    })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})


// post route for login 
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if (!foundUser) {
            res.status(401).json({ message: "Incorrect Credentials" })
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                const token = jwt.sign({
                    email: foundUser.email,
                    id: foundUser.id
                }, process.env.JWT_SECRET, {
                    expiresIn: "2h"
                })

                Profile.update({
                    last_login: new Date()
                }, {
                    where: {
                        UserId: foundUser.id
                    }
                })

                res.json({
                    token: token,
                    user: foundUser
                })
            } else {

                res.json("Incorrect Credentials")
            }
        }
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// put route to update a user
router.put('/update/account', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if (!foundUser) {
            res.status(401).json({ message: 'No user data to update. Sign up for an account first.' })
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                foundUser.update(req.body.update).then(data => {
                    res.json('successfully updated user data')
                }).catch(err => {
                    console.log(err)
                    res.json(err)
                })
            } else {
                res.status(400).json({ message: 'Please enter your current password to update account info' })
            }
        }
    })
})

router.put('/update/profile/:id', (req, res) => {
    Profile.update({ ...req.body }, {
        where: {
            UserId: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

router.delete('/delete/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json('user successfully deleted')
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

router.get("/verify", tokenAuth, (req, res) => {
    User.findByPk(req.user.id).then(foundUser => {
        res.json(foundUser)
    }).catch(err => {
        console.log(err)
        res.json({ err: err, message: "InvalidToken" })
    })
})


module.exports = router
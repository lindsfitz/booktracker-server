const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { User } = require('../../models')
const jwt = require("jsonwebtoken");
// const tokenAuth = require("../../middleware/tokenAuth")


router.get("/", (req, res) => {
    User.findAll().then(users => res.json(users)).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// post route for new users 
router.post("/signup", (req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    }).then(newUser => res.json(newUser))
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
                },
                    process.env.JWT_SECRET
                    , {
                        expiresIn: "2h"
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


module.exports = router
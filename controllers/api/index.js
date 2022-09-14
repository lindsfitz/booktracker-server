const express = require('express');
const router = express.Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes")
const reviewRoutes = require("./reviewRoutes")
const shelfRoutes = require("./shelfRoutes")
const statRoutes = require('./statRoutes')
const friendRoutes = require("./friendRoutes")
const currentReadRoutes = require('./currentReadRoutes')


router.use("/user",userRoutes)
router.use("/book",bookRoutes)
router.use("/review",reviewRoutes)
router.use("/shelf",shelfRoutes)
router.use("/friend",friendRoutes)
router.use('/stats',statRoutes)
router.use('/currentlyreading', currentReadRoutes)

module.exports = router;
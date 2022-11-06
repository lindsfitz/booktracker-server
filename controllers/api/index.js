const express = require('express');
const router = express.Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes")
const reviewRoutes = require("./reviewRoutes")
const shelfRoutes = require("./shelfRoutes")
const statRoutes = require('./statRoutes')
const friendRoutes = require("./friendRoutes")
const activityRoutes = require('./activityRoutes')
const nytRoutes = require('./nytRoutes')
const userBookRoutes = require('./userBookRoutes')
const tagRoutes = require('./tagRoutes')
const noteRoutes = require('./noteRoutes')


router.use("/user",userRoutes)
router.use("/book",bookRoutes)
router.use("/review",reviewRoutes)
router.use('/note', noteRoutes)
router.use("/shelf",shelfRoutes)
router.use("/friend",friendRoutes)
router.use('/stats',statRoutes)
router.use('/activity', activityRoutes)
router.use('/nyt', nytRoutes)
router.use('/userbooks', userBookRoutes)
router.use('/tags', tagRoutes)

module.exports = router;
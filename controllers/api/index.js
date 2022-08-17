const express = require('express');
const router = express.Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes")
const reviewRoutes = require("./reviewRoutes")
const shelfRoutes = require("./shelfRoutes")


router.use("/user",userRoutes)
router.use("/book",bookRoutes)
router.use("/review",reviewRoutes)
router.use("/shelf",shelfRoutes)

module.exports = router;
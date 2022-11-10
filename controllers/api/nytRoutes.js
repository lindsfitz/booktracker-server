const express = require('express');
const router = express.Router()
const axios = require('axios')
require('dotenv').config();



router.get('/list/:list', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.nytimes.com/svc/books/v3/lists/current/${`${req.params.list}`}.json?api-key=${process.env.NYT_KEY}`
        )
        const resData = response.data
        res.send(resData)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})



module.exports = router
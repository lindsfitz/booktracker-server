const express = require('express');
const router = express.Router()
const axios = require('axios')
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true
});

router.post('/upload', async (req, res) => {
    try {

        const timestamp = Math.round((new Date).getTime() / 1000);

        const signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
            source: 'uw',
            folder: 'booktracker',
            unique_filename: false,
            overwrite: true,
        }, process.env.CLOUD_SECRET);

        res.json({
            signature: signature,
            timestamp: timestamp,
            cloudname: process.env.CLOUD_NAME,
            apikey: process.env.CLOUD_KEY
        })
    }
    catch (err) {
        console.log(err)
        res.json(err)
    }

})


module.exports = router;
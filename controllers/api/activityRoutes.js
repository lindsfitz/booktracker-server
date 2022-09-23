const express = require('express')
const router = express.Router()
const { Book, Review, Shelf, ActivityGoal } = require('../../models')
const sequelize = require('../../config/connection')


// get current month/year activity goal 
router.get('/current/:id', async (req,res) => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear()
    const monthGoal = await ActivityGoal.findOne({
        where:{
            month:month,
            year:year,
            UserId: req.params.id
        }
    })
    const yearGoal = await ActivityGoal.findOne({
        where:{
            month:null,
            year:year,
            UserId: req.params.id
        }
    })

    const userGoals = {
        month: monthGoal,
        year: yearGoal
    }

    return res.status(200).json(userGoals)

})

// get activity goal from month
router.get('/month/:month/:id', async (req,res) => {
    const now = new Date();
    const year = now.getFullYear()
    const monthGoal = await ActivityGoal.findOne({
        where:{
            month:req.params.month,
            year:year,
            UserId: req.params.id
        }
    })
    return res.status(200).json(monthGoal)
})

// get activity goal from year
router.get('/year/:year/:id', async (req,res)=> {
    const yearGoal = await ActivityGoal.findOne({
        where:{
            month:null,
            year:req.params.year,
            UserId: req.params.id
        }
    })

    return res.status(200).json(yearGoal)
})

// post new goal 
router.post('/new', (req,res) => {
    ActivityGoal.create({...req.body})
    .then(goal => res.json(goal))
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})


module.exports = router
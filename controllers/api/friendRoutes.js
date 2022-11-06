const express = require('express');
const router = express.Router();
const { User, Request } = require('../../models')


// GET friends -- get all friends based on userid (search both userid columns for matches)

router.get('/:id', (req,res) => {
    User.findByPk(req.params.id, {
        include: [{
            model:User,
            as:'Sender'
        },
        {
            model:User,
            as:'Receiver'
        }]
    }).then(user => {
        res.json(user)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// where: {
//     [Op.or]: {
//       senderId: userId,
//       receiverId: userId,
//     },

// POST friends -- create new Friend; 
        // add sender to the currently logged in user
        // user(currentUserId).addSender(senderIdfromRequest)
        // then delete the request that matches the senderId & the receiverId

router.post('/add/:sender',(req,res)=>{
    User.findByPk(req.body.id).then(user => {
        user.addReceiver(req.params.sender)
        res.json({message:'Friend added successfully!'})
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

// DELETE friend -- delete Friend where senderId & receiverId match

// router.delete('/delete/:sender',(req,res)=> {

// })

// GET received requests -- get all requests where receiverId is userid

// GET pending requests -- get all requests where senderId is userid

// POST new request -- create a request where current user is SenderId

// DELETE a request -- delete where current user is SenderId


module.exports = router
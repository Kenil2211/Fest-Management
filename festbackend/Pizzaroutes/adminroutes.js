const express = require('express');
const router = express.Router();
const festadmins = require('../eventmodel/adminsmodel');


router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await festadmins.find({email,password})
        if(user.length>0){
            const currentUser ={
              
                isAdmin:user[0].isAdmin,
                _id:user[0].id
            }
            res.status(200).send(currentUser)
        }else{
            res.status(400).json({
                message:'login failed'
            })
        }
    }
     catch(error){
        res.status(404).json({
            message:'something went wrong'
        })
    }
})

module.exports = router;

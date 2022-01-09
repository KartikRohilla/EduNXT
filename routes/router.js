const express = require('express')
const router = express.Router()
const auth = require('../middleware/Auth')
const User = require('../models/userModel')


router.post("/login",  async (req, res)=>{
    try {
         const user = await User.findByCredentials(req.body.username , req.body.password)
        !user ? flags(undefined , 403 , req , res):null
        const token =  await user.generateAuthToken()
          if(user.initialSetup === false){
             res.send({
                 token:token,
                 message:'Use your token and Provide email, username and password in Patch request in /updateUser route to continue further'})
          }else{
             res.send({
                 token:token,
                 message:'You can use this token with your credentials to access further allowed functionalities'
             })
          }
    } catch (error) {
    flags(undefined , 401 , req ,res)
    }
    })


    
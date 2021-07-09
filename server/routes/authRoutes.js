const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const User= mongoose.model('User');


router.post('/signup',async (req,res)=>{
    const {email,password,status,nama,ktp,telp}=req.body;
    try{

        const user = new User({email,password,status,nama,ktp,telp});
        await user.save();
        const token = jwt.sign({userId:user._id},jwtkey)
        res.send({token})
    }
    catch(err){
        console.log("error")
        return res.status(422).send("Error : "+err.message)
    }

})
router.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).send({error :"invalid email/password"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error :"invalid email/password"})
    }
    try{
        console.log(user._id)
      await user.comparePassword(password);  
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token,email:req.body.email,status:req.body.status})
    }catch(err){
        return res.status(422).send({error :"invalid email/password"})
    }
  


})

module.exports=router
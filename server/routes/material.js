const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const Material= mongoose.model('Material');

router.post('/send-data-material',async (req,res)=>{
    const {nama,jml,idproject,deskripsi,status}=req.body;
    //res.send("tes")
    try{

        const material = new Material({nama,jml,idproject,deskripsi,status});
        await material.save();
        res.send(material)
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }
})

router.get('/getDataMaterial',async (req,res)=>{
    
    const material = await Material.find()
    try{
        console.log(material)
      res.send(material)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataMaterialByIdProject/:id',async (req,res)=>{
    
    const material = await Material.aggregate([{
                                                 $match:{'idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                                }])
    try{
        console.log(material)
      res.send(material)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataMaterialById/:id',async (req,res)=>{
    
    const material = await Material.findOne({_id:req.params.id})
    try{
        console.log(material)
      res.send(material)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/deleteMaterial/:id',async (req,res)=>{
    
    const material = await Material.findOneAndRemove({_id:req.params.id})
    try{
      res.send({message:'Data berhasil dihapus'})
    }catch(err){
        return res.status(422).send({error:err})
    }

})

router.post('/updateMaterial/',async (req,res)=>{
    const {_id,nama,jml,idproject,deskripsi,status}=req.body;
    const material = await Material.findByIdAndUpdate(_id,{nama:nama,jml:jml,deskripsi:deskripsi,})
    try{
      res.send(material)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

module.exports=router
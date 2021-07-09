const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Module= mongoose.model('Module');


router.post('/send-data-module',async (req,res)=>{
    const {kategori_pekerjaan,idproject}=req.body;
    //res.send("tes")
    try{

        const modul = new Module({kategori_pekerjaan,idproject});
        await modul.save();
        res.send({nama: modul.kategori_pekerjaan})
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }

})
 

router.get('/getDataModule/:id',async (req,res)=>{
    const {email,password,status}=req.body;
    const modul = await Module.aggregate([{$match:{'idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}}])
    try{
      //  console.log(modul)
      res.send(modul)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataTaskModule/:id',async (req,res)=>{
    const {email,password,status}=req.body;
    const modul = await Module.aggregate([{
                                            $lookup: 
                                            { 
                                                from: 'tasks', 
                                                localField: 'idmodule', 
                                                foreignField: '._id', 
                                                as: 'task'
                                            }
                                        },{
                                            $unwind: "$task"
                                          },{$match:{'idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}}])
    try{
      //  console.log(modul)
      res.send(modul)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

module.exports=router
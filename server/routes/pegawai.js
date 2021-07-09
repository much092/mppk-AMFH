const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const bcrypt = require('bcrypt');
const router = express.Router();
const User= mongoose.model('User');
const Client= mongoose.model('Client');
const Project= mongoose.model('Project');
const Team= mongoose.model('Team');
var base64ToImage = require('base64-to-image');


router.post('/send-data-pegawai',async (req,res)=>{
    const {email,status,nama,ktp,telp,tgl_lahir,aktif}=req.body;
    //res.send("tes")
    try{
        const password=ktp;
        const user = new User({email,password,status,nama,tgl_lahir,ktp,telp,aktif});
        await user.save();
        const token = jwt.sign({userId:user._id},jwtkey)
        res.send({nama: user.nama})
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : "ktp sudah terdaftar"})
        //return res.status(422).send("Error : "+err.message)
    }

})

router.get('/getDataPegawai',async (req,res)=>{
    const {email,password,status}=req.body;
    const user = await User.find({status:{$ne:'admin'}})
    try{
        console.log(user)
      res.send(user)
    }catch(err){
        return res.status(422).send(err.message)
    }

})


router.get('/getDataDetailPegawai/:id',async (req,res)=>{
    
    const user = await User.findOne({_id:req.params.id})
    try{
       console.log(user)
      res.send(user)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/deletePegawai/:id',async (req,res)=>{
    
    const user = await User.findOneAndRemove({_id:req.params.id})
    try{
      res.send({message:'Data berhasil dihapus'})
    }catch(err){
        return res.status(422).send({error:err})
    }

})

router.get('/getDataPM',async (req,res)=>{
    const {email,password,status}=req.body;
    const user = await User.find({aktif:'no',status:'pm'})
    try{
        console.log(user)
      res.send(user)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataPegawai2',async (req,res)=>{
    const {email,password,status}=req.body;
    const user = await User.find({aktif:'no',status:'karyawan'})
    try{
        console.log(user)
      res.send(user)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.post('/update-data-user',async (req,res)=>{
    const {_id,nama,email,ktp,telp,password,image,aktif}=req.body;
//     //res.send("tes")
//    // console.log(req.body.fileData)
//     if(req.body.fileData=='data:undefined;base64,'){
//         var fileName= image;
//     }
//     else{
//         var base64Str = req.body.fileData;
//         var fileName = Date.now()+'_'+req.body.fileName;
//         var type = req.body.type;
//         var path ='uploads/';
//         var optionalObj = {'fileName': fileName, 'type':type};
     
//          base64ToImage(base64Str,path,optionalObj); 
//     }
   
         
    try{
        if(password!= ''){
            const hash = bcrypt.hashSync(password, 10);
            const user = await User.findByIdAndUpdate(_id,{nama:nama,email:email,ktp:ktp,telp:telp,password:hash,image:image,aktif:aktif})
            await user.save();
            res.send(user)
        }
        else{
            const user = await User.findByIdAndUpdate(_id,{nama:nama,email:email,ktp:ktp,telp:telp,image:image,aktif:aktif})
            await user.save();
            res.send(user)
        }
        
    }
    catch(err){
        console.log(err)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }

})


router.post('/updateAktif',async (req,res)=>{
    const {_id,aktif,idteam}=req.body;
    const user = await User.findByIdAndUpdate(_id,{aktif:aktif})
    await Team.findByIdAndUpdate(idteam,{status:aktif})
    try{
      res.send(user)
    }catch(err){
        return res.status(422).send(err.message)
    }

})


router.post('/updateJabatan',async (req,res)=>{
    const {_id,status}=req.body;
    const user = await User.findByIdAndUpdate(_id,{status:status})
    try{
      res.send(user)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getCount',async (req,res)=>{
 
    const user = await User.count({status:{$ne:'admin'}})
    const client = await Client.count()
    const project = await Project.aggregate([
                                            {
                                                $lookup: 
                                                { 
                                                    from: 'clients', 
                                                    localField: 'idclient', 
                                                    foreignField: '_id', 
                                                    as: 'client'
                                                },
                                            },{
                                                $unwind: "$client"
                                            },{
                                                $count:'count'
                                            }
                                        ])
    
    try{
        console.log(user)
      res.send({pegawai:user,client:client,project:project})
    }catch(err){
        return res.status(422).send(err.message)
    }

})

module.exports=router
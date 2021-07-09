const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const Client= mongoose.model('Client');


router.post('/send-data-client',async (req,res)=>{
    const {nama,telp,alamat,perusahaan,ktp}=req.body;
    //res.send("tes")
    try{

        const client = new Client({nama,telp,alamat,perusahaan,ktp});
        await client.save();
        res.send({nama: client.nama})
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : 'KTP sudah terdaftar'})
        //return res.status(422).send("Error : "+err.message)
    }
})

router.get('/getDataClient',async (req,res)=>{
    //const {nama,telp}=req.body;
    const client = await Client.find()
    try{
      //  console.log(u)
      res.send(client)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataClientById/:id',async (req,res)=>{
    //const {nama,telp}=req.body;
    const client = await Client.findOne({_id:req.params.id})
    try{
      res.send(client)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.post('/updateClient/:id',async (req,res)=>{
    const {_id,nama,telp,alamat,perusahaan,ktp}=req.body;
    const nik = await Client.findOne({ktp:ktp,_id:{$ne:_id}})
    try{
        if(nik){
            return res.send({error : 'KTP sudah terdaftar'})
        }
        else{
            const client = await Client.findByIdAndUpdate(_id,{nama:nama,ktp:ktp,telp:telp,alamat:alamat,perusahaan:perusahaan})
            //await client.save();
            return res.send(client)
        }
    }
    catch(err){

    }
})

router.get('/deleteClient/:id',async (req,res)=>{
    
    const client = await Client.findOneAndRemove({_id:req.params.id})
    try{
      res.send({message:'Data berhasil dihapus'})
    }catch(err){
        return res.status(422).send({error:err})
    }

})


// router.post('/updateClient/:id',async (req,res)=>{
//     const {_id,nama,telp,alamat,perusahaan,ktp}=req.body;
//     const ktp = await Client.findOne({ktp:ktp})
//     if(ktp!=0){
//         return res.send({error : 'KTP sudah terdaftar'})
//     }
// //     const client = await Client.findByIdAndUpdate(_id,{nama:nama,ktp:ktp,telp:telp,alamat:alamat,perusahaan:perusahaan})
// //    // await client.save();
// //     try{
// //       res.send(client)
// //     }catch(err){
// //         return res.send({error : 'KTP sudah terdaftar'})
// //     }

// })


module.exports=router
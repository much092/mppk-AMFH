const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Absen= mongoose.model('Absen');
const User= mongoose.model('User');

router.post('/send-data-absen',async (req,res)=>{
    const {iduser,date,keterangan,deskripsi,idproject}=req.body;

    try{

        const absen = new Absen({iduser,date,keterangan,deskripsi,idproject});
        await absen.save();
        res.send(absen)
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }
})

router.get('/getDataAbsensi/:id/:id2',async (req,res)=>{
    
    const absencount = await Absen.aggregate([
                                        {
                                            $lookup: 
                                            { 
                                                from: 'users', 
                                                localField: 'iduser', 
                                                foreignField: '_id', 
                                                as: 'user'
                                            },
                                        },{
                                            $unwind: "$user"
                                        },{
                                            $match:{'keterangan':{$in:['masuk']}}
                                        },{
                                            $match:{'user._id':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                        },{
                                            $match:{'idproject':{$in:[mongoose.Types.ObjectId(req.params.id2)]}}
                                        },{
                                            $count:'count'
                                        }
                                        ])
    const absen = await Absen.aggregate([
                                        {
                                            $lookup: 
                                            { 
                                                from: 'users', 
                                                localField: 'iduser', 
                                                foreignField: '_id', 
                                                as: 'user'
                                            },
                                        },{
                                            $unwind: "$user"
                                        },{
                                            $match:{'user._id':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                        },{
                                            $match:{'idproject':{$in:[mongoose.Types.ObjectId(req.params.id2)]}}
                                        },{
                                            $match:{'user.status':{$in:['karyawan']}}
                                        }

                                        ])
    try{
       // console.log(absen)
      res.send({absen:absen,count:absencount})
    }catch(err){
        return res.status(422).send(err.message)
    }

})


router.get('/getDataPegawaiAbsensi',async (req,res)=>{
    const {email,password,status}=req.body;
    const user = await User.find({status:{$in:'karyawan'}})
    try{
        console.log(user)
      res.send(user)
    }catch(err){
        return res.status(422).send(err.message)
    }

})
module.exports=router
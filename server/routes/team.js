const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const Team= mongoose.model('Team');
const User= mongoose.model('User');
const id ='';

router.post('/send-data-team',async (req,res)=>{
    const {iduser,idproject,aktif}=req.body;
    //res.send("tes")
    Team.count({'idproject': idproject,'iduser':iduser}, async function (err, count){
        if(count>0){
            res.send({error:"Data sudah ada"})
        }
        else{
            try{

                const team = new Team({iduser,idproject});
                const user = await User.findByIdAndUpdate(iduser,{aktif:aktif})
                await team.save();
                await user.save();
                res.send(team)
            }
            catch(err){
                const error = err.message;
                console.log(error)
                return res.send({error : err.message})
                //return res.status(422).send("Error : "+err.message)
            }
        }
    })
    
})

router.get('/getDataTeam/:id',async (req,res)=>{
    
    const team = await Team.aggregate([
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
                                            $match:{'idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                        }
                                    ]
                                    );
    try{
        console.log(team)
      res.send(team)
    }catch(err){
        return res.status(422).send(err.message)
    }

})


router.post('/getDataProjectByIdP',async (req,res)=>{
    const {iduser}=req.body;
    const team = await  Team.aggregate([
                                        {
                                            $lookup: 
                                            { 
                                                from: 'users', 
                                                localField: 'iduser', 
                                                foreignField: '_id', 
                                                as: 'user'
                                            },
                                        },
                                        {
                                            $lookup:
                                            {
                                                from: 'projects', 
                                                localField: 'idproject', 
                                                foreignField: '_id', 
                                                as: 'project'
                                                
                                            }
                                        },
                                        {
                                            $lookup:
                                            {
                                                from: 'clients', 
                                                localField: 'project.idclient', 
                                                foreignField: '_id', 
                                                as: 'client'
                                            }
                                        },{
                                            $unwind: "$user"
                                        },{
                                            $unwind: "$project"
                                        },{
                                            $unwind: "$client"
                                        },{
                                            $match:{'user._id':{$in:[mongoose.Types.ObjectId(iduser)]}}
                                        }
                                    ]
                                    );
    
    try{
     //   console.log(team.user)
        res.send(team);
    }catch(err){
        return res.status(422).send(err.message)
    }

})


router.get('/getDataProjectByIdPegawai/:id',async (req,res)=>{
   // const {iduser}=req.body;
    const team = await  Team.aggregate([
                                        {
                                            $lookup: 
                                            { 
                                                from: 'users', 
                                                localField: 'iduser', 
                                                foreignField: '_id', 
                                                as: 'user'
                                            },
                                        },
                                        {
                                            $lookup:
                                            {
                                                from: 'projects', 
                                                localField: 'idproject', 
                                                foreignField: '_id', 
                                                as: 'project'
                                            }
                                        },{
                                            $lookup:
                                            {
                                                from: 'clients', 
                                                localField: 'project.idclient', 
                                                foreignField: '_id', 
                                                as: 'client'
                                            }
                                        },{
                                            $unwind: "$user"
                                        },{
                                            $unwind: "$project"
                                        },{
                                            $unwind: "$client"
                                        },{
                                            $match:{'user._id':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                        }
                                    ]
                                    );
    
    try{
        console.log(team)
        res.send(team);
    }catch(err){
        return res.status(422).send(err.message)
    }

})

module.exports=router
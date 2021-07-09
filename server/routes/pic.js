const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const Pic= mongoose.model('Pic');
const User= mongoose.model('User');
const Project= mongoose.model('Project');

router.post('/send-data-Pic',async (req,res)=>{
    const {idproject,iduser}=req.body;
    //res.send("tes")
    Pic.count({'idproject': idproject}, async function (err, count){ 
        if(count>0){
            res.send({error:"Project sudah memiliki penanggung jawab"})
        }
        else{
            try{
                const pic = new Pic({idproject,iduser});
                const project = await Project.findByIdAndUpdate(idproject,{'aktif':'yes'})
                await User.findByIdAndUpdate(iduser,{'aktif':'yes'})
                await pic.save();
                res.send({message:"sukses"})
            }
            catch(err){
                const error = err.message;
                console.log(error)
                return res.send({error : err.message})
                //return res.status(422).send("Error : "+err.message)
            }
        }

    }); 
    
})

router.get('/getDataPic',async (req,res)=>{
    const {iduser}=req.body;
    const pic = await  Pic.aggregate([
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
                                            $unwind: "$user"
                                          },{
                                            $unwind: "$project"
                                          },
                                    ]
                                    );
    
    try{
        console.log(pic)
        res.send(pic);
    }catch(err){
        return res.status(422).send(err.message)
    }

})


router.post('/getDataProjectById',async (req,res)=>{
    const {iduser}=req.body;
    const pic = await  Pic.aggregate([
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
                                        }, {
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
        console.log(pic)
        res.send(pic);
    }catch(err){
        return res.status(422).send(err.message)
    }

})


module.exports=router
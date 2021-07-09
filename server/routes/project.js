const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const Project= mongoose.model('Project');
const Pic= mongoose.model('Pic');
const Team= mongoose.model('Team');
const User= mongoose.model('User');
const id ='';

router.post('/send-data-project',async (req,res)=>{
    const {nama,tglMulai,tglSelesai,deskripsi,idclient,status,budget,lokasi,aktif}=req.body;
    //res.send("tes")
    try{

        const project = new Project({nama,tglMulai,tglSelesai,deskripsi,idclient,status,budget,lokasi,aktif});
        await project.save();
        res.send({nama: project.nama})
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }
})
 
router.get('/getDataProject',async (req,res)=>{
    
    const project = await Project.aggregate([
                                            {
                                                $lookup: 
                                                { 
                                                    from: 'clients', 
                                                    localField: 'idclient', 
                                                    foreignField: '_id', 
                                                    as: 'client'
                                                },
                                            },
                                            {
                                                $unwind: "$client"
                                            },
                                            { $sort : { _id: -1 } },
                                        ]
                                        );
    try{
        console.log(project)
      res.send(project)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataProjectClient/:id',async (req,res)=>{
    
    const project = await Project.aggregate([
                                            {
                                                $lookup: 
                                                { 
                                                    from: 'clients', 
                                                    localField: 'idclient', 
                                                    foreignField: '_id', 
                                                    as: 'client'
                                                },
                                            },
                                            {
                                                $unwind: "$client"
                                            },{
                                                $match:{'client._id':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                              }
                                        ]
                                        );
    try{
        console.log(project)
      res.send(project)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataProjectById/:id',async (req,res)=>{
    
    const project = await Project.findOne({'_id':req.params.id})
    try{
        console.log(project)
      res.send(project)
    }catch(err){
        return res.status(422).send(err.message)
    }

})
/////detail project pada halaman admin /////
router.get('/getDetailProject/:id',async (req,res)=>{
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
                                          },{
                                            $match:{'project._id':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
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

////detail project pada halaman pegawai/////
router.get('/getDetailProjectP/:id',async (req,res,next)=>{
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
                                            $unwind: "$user"
                                          },{
                                            $unwind: "$project"
                                          },{
                                            $match:{'project._id':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
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
router.get('/getDataProjectPIC',async (req,res)=>{
    
    const project = await Project.aggregate([
                                            {
                                                $lookup: 
                                                { 
                                                    from: 'clients', 
                                                    localField: 'idclient', 
                                                    foreignField: '_id', 
                                                    as: 'client'
                                                },
                                            },
                                            {
                                                $unwind: "$client"
                                            },{
                                                $match:{'aktif':'null'}
                                            },
                                            { $sort : { _id: -1 } },
                                        ]
                                        );
    try{
        console.log(project)
      res.send(project)
    }catch(err){
        return res.status(422).send(err.message)
    }

})


router.post('/updateProjectAktif',async (req,res)=>{
    const {_id,iduser,aktif}=req.body;
    const project = await Project.findByIdAndUpdate(_id,{aktif:aktif})
    await User.findByIdAndUpdate(iduser,{aktif:aktif})
    try{
      res.send(project)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

module.exports=router
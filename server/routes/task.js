const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Task= mongoose.model('Task');
const TaskUser= mongoose.model('Taskuser');
const Modul= mongoose.model('Module');


router.post('/send-data-task',async (req,res)=>{
    const {iduser,idmodule,nama_task,status,approved,tglMulai,tglSelesai,spesifikasi}=req.body;
    //res.send("tes")
    try{

        const task = new Task({iduser,idmodule,nama_task,status,approved,tglMulai,tglSelesai,spesifikasi});
        await task.save();
        res.send({nama: task.kategori_pekerjaan})
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }

})
 

router.post('/update-data-task-approved',async (req,res)=>{
    const {_id,approved,status}=req.body;
    //res.send("tes")
    try{

        const task = await Task.findByIdAndUpdate(_id,{approved:approved,status:status})
        await task.save();
        res.send(task)
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }

})

router.get('/getDataTask/:id/:idp',async (req,res)=>{
    // const {email,password,status}=req.body;
    const task = await Task.aggregate([
                                        {
                                            $lookup: 
                                            { 
                                                from: 'modules', 
                                                localField: 'idmodule', 
                                                foreignField: '_id', 
                                                as: 'module'
                                            }
                                        },{
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
                                            $unwind: "$module"
                                          },{
                                            $match:{'module.idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                          },{
                                            $match:{'user._id':{$in:[mongoose.Types.ObjectId(req.params.idp)]}}
                                          },{
                                            $sort : {'module._id' : 1 } 
                                          }
                                        ])
    try{
      //  console.log(task)
      res.send(task)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataAllTask/:id',async (req,res)=>{
    const {email,password,status}=req.body;
    const task = await Task.aggregate([
                                        {
                                            $lookup: 
                                            { 
                                                from: 'modules', 
                                                localField: 'idmodule', 
                                                foreignField: '_id', 
                                                as: 'module'
                                            }

                                        },{
                                            $unwind: "$module"
                                          },{
                                            $match:{'module.idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                          }
                                        ])
    try{
      //  console.log(task)
      res.send(task)
    }catch(err){
        return res.status(422).send(err.message)
    }

})


router.get('/getCountProgress/:id',async (req,res)=>{
 
    const taskselesai = await Task.aggregate([
                                                {
                                                    $lookup: 
                                                    { 
                                                        from: 'modules', 
                                                        localField: 'idmodule', 
                                                        foreignField: '_id', 
                                                        as: 'module'
                                                    },
                                                },{
                                                    $match:{'module.idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                                },{
                                                    $match:{'status':{$in:['done']}}
                                                },{
                                                    $count:'countselesai'
                                                }
                                            
                                            ])
    
    const tasktotal = await Task.aggregate([
                                                {
                                                    $lookup: 
                                                    { 
                                                        from: 'modules', 
                                                        localField: 'idmodule', 
                                                        foreignField: '_id', 
                                                        as: 'module'
                                                    },
                                                },{
                                                    $match:{'module.idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                                },{
                                                    $count:'counttotal'
                                                }
                                            
                                            ])
    
    try{
        console.log(taskselesai)
      res.send({selesai:taskselesai,total:tasktotal})

    }catch(err){
        return res.status(422).send(err.message)
    }

})


module.exports=router
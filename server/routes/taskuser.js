const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Taskuser= mongoose.model('Taskuser');

router.post('/send-data-taskuser',async (req,res)=>{
    const {iduser,idtask,status}=req.body;
    //res.send("tes")
    try{

        const task = new Taskuser({iduser,idtask,status});
        await task.save();
        res.send({success: "data berhasil disimpan"})
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }

})

router.get('/getDataUserTask/:id',async (req,res)=>{

    
        try{
            const taskuser = await Taskuser.aggregate([
                {
                    $lookup: 
                    { 
                        from: 'users', 
                        localField: 'iduser', 
                        foreignField: '_id', 
                        as: 'user'
                    }

                },{
                    $unwind: "$user"
                  },{
                    $match:{'idtask':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                  }
            ])
            //  console.log(task)
            res.send(taskuser)
        }catch(err){
            return res.status(422).send(err.message)
        }
})

router.get('/getDataUserTask2/:id/:id2',async (req,res)=>{

    
    try{
        const taskuser = await Taskuser.aggregate([
            {
                $lookup: 
                { 
                    from: 'users', 
                    localField: 'iduser', 
                    foreignField: '_id', 
                    as: 'user'
                }

            },{
                $lookup: 
                { 
                    from: 'tasks', 
                    localField: 'idtask', 
                    foreignField: '_id', 
                    as: 'task'
                }

            },{
                $lookup: 
                { 
                    from: 'modules', 
                    localField: 'task.idmodule', 
                    foreignField: '_id', 
                    as: 'module'
                }

            },{
                $unwind: "$user"
              },
              {
                $match:{'module.idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
              },
              {
                $match:{'user._id':{$in:[mongoose.Types.ObjectId(req.params.id2)]}}
              }
        ])
        //  console.log(task)
        res.send(taskuser)
    }catch(err){
        return res.status(422).send(err.message)
    }
})
router.post('/update-data-task',async (req,res)=>{
    const {idtask,status}=req.body;
    //res.send("tes")
    try{
        const task = await Taskuser.updateMany({idtask:idtask},{status:status})
       // await task.save();
        res.send(task)
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }

})

module.exports=router
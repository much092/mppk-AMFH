const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Feedback= mongoose.model('Feedback');

router.post('/send-data-feedback',async (req,res)=>{
    const {idtask,feedback,date}=req.body;
            try{
                
                const feed = new Feedback({idtask,feedback,date});
                await feed.save();
                console.log("sukses")
                res.send({message:"sukses"})
            }
            catch(err){
                console.log(err)
                return res.send({error : err.message})
                //return res.status(422).send("Error : "+err.message)
            }
})

router.get('/getDataFeedback',async (req,res)=>{
    const {iduser}=req.body;
    const feed = await  Feedback.aggregate([
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
                                                from: 'tasks', 
                                                localField: 'idtask', 
                                                foreignField: '_id', 
                                                as: 'task'
                                            }
                                        },{
                                            $unwind: "$user"
                                          },{
                                            $unwind: "$task"
                                          },
                                          { $sort : { date : -1 } },
                                          { $limit : 5 }
                                    ]
                                    );
    
    try{
       // console.log(feed)
        res.send(feed);
    }catch(err){
        return res.status(422).send(err.message)
    }

})

router.get('/getDataFeedbackPegawai/:id/:idp',async (req,res)=>{
    const {iduser}=req.body;
    const feed = await  Feedback.aggregate([
                                        // {
                                        //     $lookup: 
                                        //     { 
                                        //         from: 'users', 
                                        //         localField: 'iduser', 
                                        //         foreignField: '_id', 
                                        //         as: 'user'
                                        //     },
                                        // },
                                        {
                                            $lookup:
                                            {
                                                from: 'tasks', 
                                                localField: 'idtask', 
                                                foreignField: '_id', 
                                                as: 'task'
                                            }
                                        },
                                        {
                                            $lookup:
                                            {
                                                from: 'modules', 
                                                localField: 'task.idmodule', 
                                                foreignField: '_id', 
                                                as: 'module'
                                            }
                                        },
                                        // {
                                        //     $unwind: "$user"
                                        //   },
                                          {
                                            $unwind: "$task"
                                          },{
                                            $unwind: "$module"
                                          },{
                                            $match:{'module.idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                          },
                                        //   {
                                        //     $match:{'user._id':{$in:[mongoose.Types.ObjectId(req.params.idp)]}}
                                        //   },
                                          { $sort : { date : -1 } }
                                    ]
                                    );
    
    try{
       // console.log(feed)
        res.send(feed);
    }catch(err){
        return res.status(422).send(err.message)
    }

})
 
module.exports=router
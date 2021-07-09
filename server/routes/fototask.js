const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const FotoTask= mongoose.model('FotoTask');
var base64ToImage = require('base64-to-image');

router.post('/send-data-fototask',async (req,res)=>{
    const {idtask,deskripsi,idproject,image,url}=req.body;
    //res.send("tes")
    
    //     var base64Str = req.body.fileData;
    //     var fileName = Date.now()+'_'+req.body.fileName;
    //     var type = req.body.type;
    //     var path ='uploads/';
    //     var optionalObj = {'fileName': fileName, 'type':type};
     
    //      base64ToImage(base64Str,path,optionalObj); 

    //      var imageInfo = base64ToImage(base64Str,path,optionalObj);
    //   console.log(imageInfo) 
      
    try{
       // const image = fileName;
        const fototask = new FotoTask({image,idtask,deskripsi,idproject,url});
        await fototask.save();
        res.send(fototask)
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }
})


router.get('/getDataFotoTask/:id',async (req,res)=>{
    
    const fototask = await FotoTask.aggregate([
                                        {
                                            $lookup: 
                                            { 
                                                from: 'tasks', 
                                                localField: 'idtask', 
                                                foreignField: '_id', 
                                                as: 'task'
                                            },
                                        },{
                                            $unwind: "$task"
                                        },{
                                            $match:{'idproject':{$in:[mongoose.Types.ObjectId(req.params.id)]}}
                                          }
                                    ]
                                    );
    try{
        console.log(fototask)
      res.send(fototask)
    }catch(err){
        return res.status(422).send(err.message)
    }

})

    
module.exports=router
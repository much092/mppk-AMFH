const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Feedback2= mongoose.model('Feedback2');

router.post('/send-data-feedback2',async (req,res)=>{
    const {idproject,iduser,feedback,date}=req.body;
            try{
                
                const feed = new Feedback2({idproject,iduser,feedback,date});
                await feed.save();
                res.send({message:"sukses"})
            }
            catch(err){
                console.log(err)
                return res.send({error : err.message})
                //return res.status(422).send("Error : "+err.message)
            }
})

router.get('/getDatafeedback2/:id',async (req,res)=>{
 
    const feed = await  Feedback2.find({idproject:req.params.id}).sort({date: -1})
    
    try{
       // console.log(feed)
        res.send(feed);
    }catch(err){
        return res.status(422).send(err.message)
    }

})

 
module.exports=router
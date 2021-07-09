const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys');
const { compare } = require('bcrypt');
const router = express.Router();
const Document= mongoose.model('Document');
var base64ToImage = require('base64-to-image');

router.post('/upload', async (req, res,next) => {
   // console.log(req.body.fileData);
    //  var base64Str = req.body.fileData;
    //  var fileName = Date.now()+'_'+req.body.fileName;
    //  var type = req.body.type;
    //  var path ='uploads/';
    //  var optionalObj = {'fileName': fileName, 'type':type};
     
    //      base64ToImage(base64Str,path,optionalObj); 
         
    //   var imageInfo = base64ToImage(base64Str,path,optionalObj);
    //   console.log(imageInfo) 
     //var idproject = req.body.idproject;
     const {idproject,fileName,type,url}=req.body;
      try{
        const document = new Document({idproject,fileName,type,url});
        await document.save();
        res.send({message:"sukses"})
    }
    catch(err){
        const error = err.message;
        console.log(error)
        return res.send({error : err.message})
        //return res.status(422).send("Error : "+err.message)
    }
    });

    router.get('/getDataDocument/:id',async (req,res)=>{
    
        const document = await Document.find({idproject:{$in:req.params.id}})
        try{
            console.log(document)
          res.send(document)
        }catch(err){
            return res.status(422).send(err.message)
        }
    
    })
    
    
    
module.exports=router
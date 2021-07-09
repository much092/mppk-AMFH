const mongoose=require('mongoose');

const toolSchema = new mongoose.Schema({
    nama:{
        type:String,
        required:true
    },
    jml:{
        type:String,
        required:true
    },
    idproject:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required:true
    },
    deskripsi:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false
    }
})



mongoose.model('Tool',toolSchema);
const mongoose=require('mongoose');

const absenSchema = new mongoose.Schema({
    
    iduser:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    idproject:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required:true
    },
    date:{
        type:String,
        required:true
    },
    keterangan:{
        type:String,
        required:true
    },
    deskripsi:{
        type:String,
        required:false
    }
})



mongoose.model('Absen',absenSchema);
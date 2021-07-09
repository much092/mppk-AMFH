const mongoose=require('mongoose');

const taskSchema = new mongoose.Schema({
    
    nama_task:{
        type:String,
        required:true
    },
    tglMulai:{
        type:String,
        required:false
    },
    tglSelesai:{
        type:String,
        required:false
    },
    spesifikasi:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:true
    },
    approved:{
        type:String,
        required:true
    },
    deskripsi:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:false
    },
    idmodule:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required:true
    },
    iduser:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:false
    }
})



mongoose.model('Task',taskSchema);
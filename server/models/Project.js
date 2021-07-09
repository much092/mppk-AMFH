const mongoose=require('mongoose');

const projectSchema = new mongoose.Schema({
    nama:{
        type:String,
        required:true
    },
    tglMulai:{
        type:String,
        required:true
    },
    tglSelesai:{
        type:String,
        required:true
    },
    deskripsi:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    idclient:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required:true
    },
    budget:{
        type:String,
        required:true
    },
    lokasi:{
        type:String,
        required:true
    },
    aktif:{
        type:String,
        required:true
    },
})



mongoose.model('Project',projectSchema);
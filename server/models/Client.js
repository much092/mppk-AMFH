const mongoose=require('mongoose');

const clientSchema = new mongoose.Schema({
    nama:{
        type:String,
        unique:true,
        required:true
    },
    telp:{
        type:String,
        required:true
    },
    alamat:{
        type:String,
        required:true
    },
    perusahaan:{
        type:String,
        required:true
    },
    ktp:{
        type:String,
        unique:true,
        required:true
    }
})



mongoose.model('Client',clientSchema);
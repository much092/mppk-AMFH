const mongoose=require('mongoose');

const moduleSchema = new mongoose.Schema({
    
    kategori_pekerjaan:{
        type:String,
        required:true
    },
    idproject:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required:true
    }
})



mongoose.model('Module',moduleSchema);
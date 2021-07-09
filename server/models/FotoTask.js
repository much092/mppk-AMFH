const mongoose=require('mongoose');

const fototaskSchema = new mongoose.Schema({
    
    image:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    deskripsi:{
        type:String,
        required:true
    },
    idtask:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required:true
    },
    idproject:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required:true
    }
})



mongoose.model('FotoTask',fototaskSchema);
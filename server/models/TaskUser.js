const mongoose=require('mongoose');

const taskuserSchema = new mongoose.Schema({
    
    idtask:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required:true
    },
    iduser:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    status:{
        type:String,
        required:true
    }

})



mongoose.model('Taskuser',taskuserSchema);
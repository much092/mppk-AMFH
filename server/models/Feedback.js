const mongoose=require('mongoose');

const feedbackSchema = new mongoose.Schema({
    
    iduser:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:false
    },
    idtask:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required:true
    },
    feedback:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})



mongoose.model('Feedback',feedbackSchema);
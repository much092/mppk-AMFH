const mongoose=require('mongoose');

const feedback2Schema = new mongoose.Schema({
    
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
    feedback:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})



mongoose.model('Feedback2',feedback2Schema);
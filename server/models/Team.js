const mongoose=require('mongoose');

const teamSchema = new mongoose.Schema({
    
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
    status:{
        type:String,
        required:false
    }
})



mongoose.model('Team',teamSchema);
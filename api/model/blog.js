const mongoose=require('mongoose');

blogSchema=new mongoose.Schema({
    _id:mongoose.Schema.ObjectId,
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    photo:String
},
{timestamps:true}
)

module.exports=mongoose.model('blog',blogSchema);

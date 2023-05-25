const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatarImageStatus:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    },
    friends:[{
        type:mongoose.Types.ObjectId,
        ref:"Users"
    }]
})

module.exports=mongoose.model("Users",userSchema)
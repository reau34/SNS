const User=require("../model/userModel")
const bcrypt=require("bcrypt")

module.exports.sign_up=async(req,res)=>{
    const username=req.body.username
    const email=req.body.email
    const password=req.body.password
    const usernameCheck=await User.findOne({username})
    if(usernameCheck){
        return res.json({message:"Username is already taken.",status:false})
    }
    const emailCheck=await User.findOne({email})
    if(emailCheck){
        return res.json({message:"Email is already taken.",status:false})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const user =await User.create({
        username,
        email,
        password:hashedPassword
    })
    delete user.password 
    res.json({user,status:true})
}

module.exports.sign_in=async(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const user=await User.findOne({username})
    if(!user){
        res.json({message:"User not found",status:false})
    }else{
        bcrypt.compare(password,user.password).then((response)=>{
            if(response){
                res.json({user,status:true})
            }else{
                res.json({message:"Wrong password",status:false})
            }
        })
    }
}

module.exports.set_avatar=async(req,res)=>{
    const id=req.params.id
    const image=req.body.image
    const user= await User.findByIdAndUpdate(id,{
        avatarImageStatus:true,
        avatarImage:image
    })
    return res.json({image:user.avatarImage})
}

module.exports.get_users=async(req,res)=>{
    const id=req.params.id
    const users=await User.find({_id:{$ne:req.params.id}}).select([
        "username",
        "avatarImage"
    ])
    return res.json(users)
}
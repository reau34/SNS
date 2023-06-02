const Messages=require("../model/messageModel")

module.exports.add_msg=async(req,res)=>{
    const message=req.body.message
    const from=req.body.from
    const to=req.body.to
    const data=await Messages.create({
        message:{
            text:message
        },
        users:[from,to],
        sender:from
    })
    return res.json({msg:"Message sent"})
}

module.exports.get_msg=async(req,res)=>{
    const from=req.body.from
    const to=req.body.to
    const messages=await Messages.find({
        users:{
            $all:[from,to]
        }
    }).sort({updatedAt:1})
    const mappedMessages=messages.map((msg)=>{
        return{
            fromSelf:msg.sender.toString()===from,
            message:msg.message.text
        }
    })
    res.json(mappedMessages)
}
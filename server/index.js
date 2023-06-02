const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userRoutes=require("./routes/userRoutes")
const messagesRoutes=require("./routes/messagesRoutes")
const socket=require("socket.io")
require("dotenv").config()

const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)
app.use("/api/msg",messagesRoutes)

async function connection(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB")
    }catch(error){
        console.log(error)
    }
}

connection()
const server=app.listen(process.env.PORT,()=>{
    console.log("Servers listening")
})

const io=socket(server,{
    cors:{
        origin:["http://localhost:3000"],
        credentials:true,

    }
})

global.onlineUsers=new Map()

io.on("connection",(socket)=>{
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message)
        }
    })
})


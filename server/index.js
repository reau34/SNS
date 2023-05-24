const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userRoutes=require("./routes/userRoutes")
require("dotenv").config()

const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)

async function connection(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB")
    }catch(error){
        console.log(error)
    }
}

connection()
app.listen(process.env.PORT,()=>{
    console.log("Servers listening")
})
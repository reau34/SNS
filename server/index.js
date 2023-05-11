const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
require("dotenv").config()

const app=express()

app.use(cors())
app.use(express.json())

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
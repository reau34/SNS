const {add_msg,get_msg}=require("../controllers/messagesController")

const router=require("express").Router()

router.post("/add_msg",add_msg)
router.post("/get_msg",get_msg)

module.exports=router
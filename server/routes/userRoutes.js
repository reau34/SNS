const { sign_up, sign_in, set_avatar, get_users, add_friend, get_friends } = require("../controllers/usersController")

const router=require("express").Router()

router.post("/sign_up",sign_up)
router.post("/sign_in",sign_in)
router.post("/set_avatar/:id",set_avatar)
router.post("/get_users/:id",get_users)
router.put("/add_friend",add_friend)
router.post("/get_friends",get_friends)

module.exports=router
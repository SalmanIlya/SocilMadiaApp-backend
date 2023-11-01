const express=require("express")
const app=express.Router()
const {userdata,LoginUser}= require("../Controllers/Auth")

app.post("/Register",userdata)
app.post("/Login",LoginUser)





module.exports=app
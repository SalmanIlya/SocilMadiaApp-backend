const express=require("express")
const user=require("./User")
const app=express.Router()

app.use("/admin",user)


module.exports=app
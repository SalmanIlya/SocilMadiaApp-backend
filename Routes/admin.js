const express=require("express")
const user=require("./User")
const Post = require("./Post")
const app=express.Router()

app.use("/user",user)
app.use("/post",Post)

module.exports=app
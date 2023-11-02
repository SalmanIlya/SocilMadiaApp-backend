const express=require("express")
const { createPost, UpdatePost, DeletePost, getMyPosts } = require("../Controllers/Post")
const app=express.Router()

app.post("/create/:id",createPost)
app.put("/update/:id/:porductId",UpdatePost)
app.delete("/delete/:id/:porductId",DeletePost)
app.post("/getmypost/:id",getMyPosts)


module.exports=app
const express = require("express");
const app = express.Router();
const {
  updateUser,
  GetAllUser,
  GetSingleUser,
  DeleteUser,
  forgetPassword,
  NewPassword,
  FollowUser,
  UnfollowUser,
} = require("../Controllers/User");
app.put("/updateUser/:id", updateUser);
app.get("/allUser", GetAllUser);
app.get("/singleuser/:id", GetSingleUser);
app.delete("/delete/user/:id", DeleteUser);
app.post("/forgetpassword", forgetPassword);
app.post("/:id/:token", NewPassword);
app.get("/follow/:id",FollowUser)
app.get("/unfollow/:id",UnfollowUser)
module.exports = app;

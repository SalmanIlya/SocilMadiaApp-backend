const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 3,
  },
  profilePhoto:{
    type:String,
    default:""
  },
  coverPhoto:{
    type:String,
    default:""

  },
  followers:{
    type:Array,
    default:[]
  },
  following:{
type:Array,
default:[]
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  des:{
    type:String,
    max:50
  },
  city:{
type:String,
max:50
  },
  from:{
    type:String,
    max:50
  },
  relationship:{
    type:Number,
    enum:[1,2,3]
  }

},{timestamps:true});
module.exports=mongoose.model("user",UserSchema)
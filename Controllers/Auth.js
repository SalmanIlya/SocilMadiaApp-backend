const User = require("../modules/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
dotenv.config({ path: "Config/.env" });
const secritkey = process.env.secritkey;
const userdata = async (req, res) => {
  // if(!username && !email && !password && !profilePhoto && !coverPhoto  ){}
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.RC4.encrypt(req.body.password, secritkey).toString(),
    profilePhoto: req.body.profilePhoto,
    coverPhoto: req.body.coverPhoto,
    follower: req.body.follower,
    following: req.body.following,
    des: req.body.des,
    city: req.body.city,
    from: req.body.from,
    relationship: req.body.relationship,
  });
  try {
    const CreateUser = await user.save();
    res.send(CreateUser);
  } catch (err) {}
};
// loginUser
const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    res.status(404).json({
      massage: "all fields are required",
    });
  } else {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).json({
          massage: "email or password is incorrect",
        });
      } else {
        const pass = CryptoJS.RC4.decrypt(user.password, secritkey);
        const checkpassword = pass.toString(CryptoJS.enc.Utf8);
        if (password === checkpassword) {
          res.status(202).json({
            user,
          });
        }else{
            res.status(404).json({
                massage :  "email or password is incorrect"
              })
        }
      }
    } catch (err) {
        res.status(404).json({
            massage :  err.massage,

            
          })
    }
  }
};
module.exports = {
  userdata,
  LoginUser
};

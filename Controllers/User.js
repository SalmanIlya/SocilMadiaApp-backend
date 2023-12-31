const User = require("../modules/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "Config/.env" });
const secritkey = process.env.secritkey;
const updateUser = async (req, res) => {
  const users = {
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.RC4.encrypt(req.body.password, secritkey).toString(),
    profilePhoto: req.body.profilePhoto,
    coverPhoto: req.body.coverPhoto,
    followers: req.body.followers,
    following: req.body.following,
    des: req.body.des,
    city: req.body.city,
    from: req.body.from,
    relationship: req.body.relationship,
  };
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: users },
    { new: true }
  );
  res.status(202).json({
    massage: "this user is update successfully",
    updateUser,
  });
};
// get all User
const GetAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(202).json({
      massage: "success",
      user,
    });
  } catch (err) {
    res.status(404).json({
      massage: "error",
    });
  }
};
// get single user
const GetSingleUser = async (req, res) => {
  try {
    const userdata = await User.findById(req.params.id);
    if (!userdata) {
      res.status(404).json({
        massage: "user is not found",
      });
    } else {
      const token = jwt.sign(
        {
          id: userdata._id,
        },
        secritkey
      );
      const { password, ...other } = userdata._doc;
      res.status(200).json({
        massage: "success",
        other,
        token,
      });
    }
  } catch (err) {
    res.status(404).json({
      massage: "error",
      err,
    });
  }
};
// delete user
const DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);

    res.send("sussessful");
  } catch (err) {
    res.status(404).json({
      massage: "error",
      err,
    });
  }
};
// follow user
const FollowUser =async(req, res) => {
  // res.status(200).json({userid:});
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({
          $push: {
            following: req.params.id,
          },
        });
        res.status(200).json("user has been followed");
      }
    } catch (err) {
      res.status(404).json({
        massage: "error",
        err,
      });
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};
// unfollow user
const UnfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
    console.log(1);

      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
    console.log(2);

        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({
          $pull: {
            following: req.params.id,
          },
        });
        res.status(200).json("user has been unfollowed");
      }else{
    console.log("else");
res.send("else")
      }
    } catch (err) {
      res.status(404).json({
        massage: "error",
        err,
      });
    console.log("Error");

    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

// forget password
const forgetPassword = async (req, res) => {
  try {
    const useremail = await User.findOne({ email: req.body.email });
    if (!useremail) {
      res.status(404).json({
        massage: "user not found",
      });
    } else {
      const tokendata = useremail._id + secritkey;
      const token = jwt.sign({ id: useremail._id }, tokendata);
      res.status(200).json(
        `please visit this link for new password   http://localhost:3000/formatpassword/${useremail._id}/${token}  
          this link will be expire in 10 minutes
          `
      );
    }
  } catch (err) {
    res.status(404).json({
      massage: "error",
      err,
    });
  }
};
// change password with forgetpassword new password
const NewPassword = async (req, res) => {
  const { id, token } = req.params;
  const { Password, ConfurmPassword } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.send("not found");
    } else {
      const firsttoken = user._id + secritkey;
      // console.log("token ",firsttoken);
      jwt.verify(token, firsttoken);
      if (Password === ConfurmPassword) {
        const hashpassword = CryptoJS.RC4.encrypt(
          Password,
          secritkey
        ).toString();

        await User.findByIdAndUpdate(user._id, {
          $set: { password: hashpassword },
        });

        res.status(200).json("password is update");
        // res.send("done")
      } else {
        res.status(404).json({
          massage: "password not match",
        });
      }
    }
  } catch (err) {
    res.status(404).json({
      massage: "error",
    });
  }
};
module.exports = {
  updateUser,
  GetAllUser,
  GetSingleUser,
  DeleteUser,
  forgetPassword,
  NewPassword,
  FollowUser,
  UnfollowUser
};

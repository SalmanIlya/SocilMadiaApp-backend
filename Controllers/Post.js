const Post = require("../modules/Post");

// createPost
const createPost = async (req, res) => {
  if (req.body.userId === req.params.id) {
    const postdata = new Post(req.body);
    try {
      const post = await postdata.save();
      res.status(200).json({
        success: true,
        post,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        err,
      });
    }
  } else {
    res.status(404).json({
      success: false,
      massage: "you are not allow to use some 1 else account",
    });
  }
};
// update post
const UpdatePost = async (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      const Updatepost = await Post.findByIdAndUpdate(
        req.params.porductId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({
        success: true,
        massage: "",
        Updatepost,
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      massage: "you are not allow to use some 1 else account",
      err,
    });
  }
};
// delete post 
const DeletePost = async (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      const deletepost = await Post.findByIdAndDelete(req.params.porductId);
      res.status(200).json({
        success: true,
        massage: "post has been deleted",
      });
    } else {
      res.status(404).json({
        success: false,
        massage: "you are not allow to use some 1 else account",
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      massage: "you are not allow to use some 1 else account",
    });
  }
};
// get like 
const GetLike=async(req,res)=>{
  try{

  }catch(err){
     
  }
}

// get only my  all posts
const getMyPosts = async (req, res) => {
};

module.exports = { createPost, UpdatePost, DeletePost, getMyPosts };

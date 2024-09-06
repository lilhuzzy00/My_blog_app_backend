const Post = require("../models/post");
const expressJwt = require("express-jwt");

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    // console.log("POST in EDITDELETE MIDDLEWARE => ", post);
    if (req.user._id != post.postedBy) {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
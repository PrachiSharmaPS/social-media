const postModel = require("../models/postModel");
const commentModel = require("../models/commentModel");

// create a new comment on a post
let createComment = async function (req, res) {
  try {
  const postId = req.params.id;
  const comment = req.body.comment;
  const userId = req.userId;
    // find the post to add the comment to
    let post = await postModel.findByIdAndUpdate(postId, {
      $set: { comments: comment }
    });
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    // create a new comment
    let commentDetail={
      comment:comment,
      postId:postId,
      userId:userId
    }
    const commentData = await commentModel.create(commentDetail);
    res.status(201).send({_id:commentData._id});
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.massage });
  }
};

module.exports = { createComment };

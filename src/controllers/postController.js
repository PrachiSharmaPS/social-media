const likeModel = require('../models/likeModel');
const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');
let mongoose=require("mongoose")
let ObjectId=mongoose.Schema.Types.ObjectId
// Create a new post
let createPost = async function(req, res)  {
  try {
    let {Title,Description} = req.body;
   if(!Title){
    res.status(400).send({msg:"Title is missing"})
   }
   if(!Description){
    res.status(400).send({msg:"Description is missing"})
   }
    let userId=req.userId
    let postData={
      Title:Title,
      Description:Description,
      authorId:userId
    }
    let savedPost = await postModel.create(postData)
   let post={
    _id:savedPost._id,
    Title:savedPost.Title,
    Description:savedPost.Description,
    createdAt:savedPost.createdAt
   }
    res.status(201).send(post);
  } catch (err) {
    res.status(500).send({ error: err.massage});
  }
};

// Get all posts
let getAllPosts = async function(req, res){
  try {
    const userId=req.userId
    const posts = await postModel.find({authorId:userId}).populate('comments').select('-updatedAt -authorId -__v');
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send({ error: 'Failed to get posts' });
  }
};

// Get a single post by ID
let getPostById = async function(req, res) {
  try {
    const userId=req.params.userID
    const post = await postModel.findOne(userId).populate('comments');
    if (!post) {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({ error: err.massage });
  }
};

// Delete a post by ID
let deletePostById =async function(req, res)  {
  try {
    const postId=req.params.id;
    const userId=req.userId;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({ msg: 'Post not found' });
    }
   
    if(post.authorId!=userId){
      return res.status(400).send({ msg: 'you are not authorised to delete the post' });
    }
    likeModel.deleteMany({postId:postId})
   commentModel.deleteMany({postId:postId})
  await postModel.deleteOne({_id:postId})

      res.status(200).send({ msg:"post deleted successfulluy" });
    
  } catch (err) {
    res.status(500).send({ error: err.massage });
  }
};

module.exports = { createPost,getAllPosts,getPostById, deletePostById };
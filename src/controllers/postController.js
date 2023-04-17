const likeModel = require('../models/likeModel');
const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');
// Create a new post
let createPost = async function(req, res)  {
  try {
    let {Title,Description} = req.body;
   if(!Title){
    res.status(400).send({error:"Title is missing"})
   }
   if(!Description){
    res.status(400).send({error:"Description is missing"})
   }
    let userId=req.userId
    let postData={
      Title:Title,
      Description:Description,
      authorId:userId
    }
    let savedPost = await postModel.create(postData)
   let post={
    Title:savedPost.Title,
    Description:savedPost.Description,
    _id:savedPost._id,
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
      return res.status(404).send({ error: 'Post not found' });
    }
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({ error: err.massage });
  }
};

// Delete a post by ID
let deletePostById = async function(req, res)  {
  try {
    const postId=req.params.id;
    const userId=req.userId;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    if(post.authorId!=userId){
      return res.status(400).send({ error: 'you are not authorised to delete the post' });
    }
    likeModel.deleteMany({postId:postId})
   commentModel.deleteMany({postId:postId})
    postModel.deleteOne({ _id:postId})
    res.status(200).send({msg:"data deleted successful"});
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete post' });
  }
};

module.exports = { createPost,getAllPosts,getPostById, deletePostById };
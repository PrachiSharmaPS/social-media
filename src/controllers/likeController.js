const postModel = require('../models/postModel');
const likeModel = require('../models/likeModel');
// like a post
let likePost =async function(req, res){
  try{
  const postId = req.params.id;
  const userId = req.userId;

let likeData= await likeModel.findOne({postId:postId,userId:userId})
if(likeData){
 return res.status(400).send({msg:"post is already like"})
}
let data={
  postId:postId,
  userId:userId
}
await likeModel.create(data)

let postData=await postModel.findOneAndUpdate(postId,
  { $inc: { likes: 1 } },
    { new: true }
  );

  res.status(200).send({post:postData})
}catch(err){
  res.status(500).send({error:err.massage})
}
};

// unlike a post
let unlikePost =async function(req, res){
  try{
  const postId = req.params.id;
  const userId = req.userId;

let likeData= await likeModel.findOneAndDelete({postId:postId,userId:userId})
if(!likeData){
 return res.status(400).send({msg:"post is already unlike"})
}

let postData=await postModel.findOneAndUpdate(postId,
  { $inc: { likes: -1 } },
    { new: true }
  );

  res.status(200).send({post:postData})
}catch(err){
  res.status(500).send({error:err.massage})
}
};

module.exports={likePost,unlikePost}

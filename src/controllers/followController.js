let userModel = require("../models/userModel");

let followUser =async function(req, res){
  try {
    const userId = req.userId;
    const followingId = req.params.id;

    const followingUser = await userModel.findByIdAndUpdate(
      followingId,
      { $inc: { followers: 1 } },
      { new: true }
    );
    if (!followingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { following: 1 } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// unfollow a user
let unfollowUser = async function(req, res) {
  try {
    const userId = req.userId;
    const followingId = req.params.id;

    const followingUser = await userModel.findByIdAndUpdate(
      followingId,
      { $inc: { followers: -1 } },
    );
    if (!followingUser) {
      return res.status(404).send({ error: "User not found" });
    }
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { following: -1 } },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send({user:user});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { unfollowUser, followUser };

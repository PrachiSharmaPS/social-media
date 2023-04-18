const express=require("express")
const router=express.Router()

const {signup,login,getUser}=require("../controllers/userController")
const {likePost,unlikePost}=require("../controllers/likeController")
const {createPost,getAllPosts,getPostById,deletePostById}=require("../controllers/postController")
const {createComment}=require("../controllers/commentController")
const {followUser,unfollowUser}=require("../controllers/followController")
const {authenticate}=require("../middleware/middleware")

router.post("/api/signup",signup)
router.post("/api/authenticate",login)
router.post("/api/follow/:id",authenticate,followUser)
router.post("/api/unfollow/:id",authenticate,unfollowUser)
router.get("/api/user",authenticate,getUser)
router.post("/api/posts",authenticate,createPost)

router.delete("/api/posts/:id",authenticate,deletePostById)
router.post("/api/like/:id",authenticate,likePost)
router.post("/api/unlike/:id",authenticate,unlikePost)
router.post("/api/comment/:id",authenticate,createComment)

 router.get("/api/posts",authenticate,getPostById)
 router.get("/api/all_posts",authenticate,getAllPosts)


module.exports=router


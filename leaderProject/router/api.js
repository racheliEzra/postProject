const router = require('express').Router()
const user = require("../controllers/user")
const post = require('../controllers/post')

router.post('/login', user.Login)
router.post('/AddUser', user.AddUser)
router.get('/getUserPosts/:userId', post.getUserPosts)
router.post('/AddPost/:userId', post.AddPost)
router.post('/deletePost/:userId/:postId', post.deletePost)
router.post('/updatePost/:postId', post.updatePost)
module.exports = router
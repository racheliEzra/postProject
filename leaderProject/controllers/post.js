
const Post = require('../models/post')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getUserPosts = async (req, res) => {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET)

    }
    catch (err) {
        res.status(401).json({ err: "verify err" })
    }
    try {
        const userId = req.params.userId
        const userWithPosts = await User.findById(userId).populate('posts')
        console.log(userWithPosts)
        res.status(200).json({ posts: userWithPosts.posts })
    }
    catch (err) {
        res.status(500).json({ error: err })
        console.log('error')
    }
}

const AddPost = async (req, res) => {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET)
    }
    catch (err) {
        res.status(401).json({ err: "verify err" })
    }
    try {
        console.log("dfdcf")
        const { title, body } = req.body
        //לא נותן להוסיף פוסטים שיש להם title ו body אותו דבר 
        // let post = await Post.findOne({ title: title, body: body })
        // if (post == null) {
        //     console.log('nullllllll')
        //     const newPost = new Post({
        //         title,
        //         body
        //     })
        //     await newPost.save()
        //     post = newPost
        //     console.log(post)
        // }
        let dateTime = new Date()
        let time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds()
        console.log(time);
        var date = dateTime.getDate() + '/' + (dateTime.getMonth() + 1) + '/' + dateTime.getFullYear();

        const newPost = new Post({
            title,
            body,
            date,
            time
        })
        await newPost.save()
        const userId = req.params.userId
        console.log("post:" + newPost)
        const user = await User.findById(userId)
        // לא ניתן להוסיף פוסט שכבר קיים במערך
        // if (!user.posts.includes(newPost._id)) {

        user.posts.push(newPost._id)
        await user.save()
        // }

        console.log(user)
        res.status(200).json({ post: newPost })
    }
    catch (err) {
        res.status(500).json({ error: err })
        console.log(err)
    }
}

const deletePost = async (req, res) => {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET)
    }
    catch (err) {
        res.status(401).json({ err: "verify err" })
    }
    try {
        const userId = req.params.userId
        const postId = req.params.postId

        await Post.findByIdAndDelete(postId)
        const user = await User.findById(userId)

        let newUserPosts = []
        for (let i = 0; i < user.posts.length; i++) {
            if (user.posts[i] != postId) {
                console.log(user.posts[i])
                newUserPosts.push(user.posts[i])
                console.log(newUserPosts)
            }
        }

        user.posts = newUserPosts
        user.save()
        res.status(200).json(true)
    }
    catch (err) {
        res.status(500).json({ err: err })
    }
}

const updatePost = async (req, res) => {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET)

    }
    catch (err) {
        res.status(401).json({ err: "verify err" })
    }
    try {

        console.log('update')
        console.log(req.params.postId)
        console.log(req.body)
        await Post.findByIdAndUpdate(req.params.postId, req.body)
        res.status(200).json(true)

    }
    catch (err) {
        res.status(500).json({ err: err })
    }
}
module.exports = { getUserPosts, AddPost, deletePost, updatePost }
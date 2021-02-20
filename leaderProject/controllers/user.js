const User = require('../models/user')
const jwt = require('jsonwebtoken')

const Login = async (req, res) => {
    try {
        console.log('login!!')
        const { userName, password } = req.body

        const userLogin = await User.findOne({ userName: userName, password: password })
        console.log(userLogin)
        if (userLogin == null) {
            res.json(false)
        }
        else {
            const token = jwt.sign({ userName: userName, password: password }, process.env.SECRET)

            res.status(200).json({ userId: userLogin._id, token: token })
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
        console.log('drftgyh')
    }
}

const AddUser = async (req, res) => {
    try {
        console.log("add user")
        const { userName, password } = req.body
        const user = await User.findOne({ userName: userName, password: password })
        if (user == null) {
            const newUser = new User({
                userName,
                password,
            })


            await newUser.save()
            const token = jwt.sign({ userName: userName, password: password }, process.env.SECRET)
            res.status(200).json({ userId: newUser._id, token: token })
        }
        else {
            res.json(false)
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}

module.exports = { Login, AddUser }
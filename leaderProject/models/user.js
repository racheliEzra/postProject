const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: { type: String, require: true },
    password: { type: String, require: true, minlength: 6,maxlength:20 },
    posts:[{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
})

module.exports = mongoose.model('User',userSchema)
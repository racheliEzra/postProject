const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: { type: String },
    body: { type: String },
    date: { type: String },
    time: { type: String }
})

module.exports = mongoose.model('Post', postSchema)

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    post: { type: String, required: true },
    date: { type: String, required: true },
    replies: { type: Number, required: true},
    username: { type: String, required: true }
})

module.exports = mongoose.model("Post", postSchema)
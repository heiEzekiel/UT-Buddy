const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true },
    day: { type: String, required: true },
    reminder: {type: String, required: true},
})

module.exports = mongoose.model("Post", postSchema)
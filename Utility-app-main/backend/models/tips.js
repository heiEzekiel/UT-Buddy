const mongoose = require('mongoose');

const tipsSchema = mongoose.Schema({
    userId: { type: String, required: true },
    tips: [],
    
})

module.exports = mongoose.model("Tips", tipsSchema)
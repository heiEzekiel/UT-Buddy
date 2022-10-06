const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    zip: { type: String },
    occupation: {type: String},
    gender: {type: String}
})

module.exports = mongoose.model("User", userSchema)
const mongoose = require('mongoose');

const stripeSchema = mongoose.Schema({
    userId: { type: String, required: true },
    prices: []
})

module.exports = mongoose.model("Stripes", stripeSchema)
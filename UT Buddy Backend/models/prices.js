const mongoose = require('mongoose');

const pricesSchema = mongoose.Schema({
    
    priceId: [],
    priceLink: []
    
})

module.exports = mongoose.model("Prices", pricesSchema)
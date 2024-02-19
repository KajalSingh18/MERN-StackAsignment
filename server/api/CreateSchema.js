const mongoose = require("mongoose")

const seedSchema = new mongoose.Schema({
    "id": String,
    "title": String,
    "price": Number,
    "description": String,
    "category": String,
    "image": String,
    "sold": Boolean,
    "dateOfSale": String
})

module.exports = mongoose.model('Seed', seedSchema);
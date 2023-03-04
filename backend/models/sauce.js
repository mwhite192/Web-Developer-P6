const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: String, 
    name: String, 
    manufacturer: String, 
    description: String,
    mainPepper: String,
    imageUrl: String, 
    heat: Number,
    likes: Number, 
    dislikes: Number, 
    userLiked: [{userId: String}],
    userDisliked: [{userId: String}]
});

module.exports = mongoose.model('Sauce', sauceSchema);
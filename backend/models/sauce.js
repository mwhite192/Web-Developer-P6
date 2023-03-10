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
    usersLiked: [{userId: String}],
    usersDisliked: [{userId: String}]
});

module.exports = mongoose.model('Sauce', sauceSchema);
// set up mongoose
const mongoose = require('mongoose');

// sets the schema for the sauce
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
    usersLiked: [String],
    usersDisliked: [String]
});

// exports the sauce model
module.exports = mongoose.model('Sauce', sauceSchema);
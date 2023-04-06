// sets up mongoose
const mongoose = require('mongoose');
// It uses the mongoose-unique-validator package to ensure that the email address is unique
const uniqueValidator = require('mongoose-unique-validator');
// sets the schema for the user
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//uses the unique validator plugin
userSchema.plugin(uniqueValidator);
// exports the user model
module.exports = mongoose.model('User', userSchema);
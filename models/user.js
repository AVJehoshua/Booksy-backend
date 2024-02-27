const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String},
    email_preferences: {type: Array},
    saved_items: {type: Array}

})

const User = mongoose.model("User", UserSchema);

module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Quiz Model
let User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
)
const UserModel = mongoose.model("User", User);



// export models
module.exports.UserModel = UserModel;






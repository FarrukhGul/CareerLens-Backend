const { default: mongoose } = require('mongoose');
const monoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : [true, "Username Already Taken.. Try Different."],
        required : true,
    },
    email : {
        type : String,
        unique : [true, 'Account already exists with this email address.. Try different.'],
        required : true
    },
    password : {
        type : String,
        required : true
    }
});


const userModel = mongoose.model("users", userSchema);

module.exports = userModel
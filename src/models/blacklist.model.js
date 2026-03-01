const mongoose = require('mongoose')

const blackListTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : [true, 'A token is requied to add in a blacklist.']
    }
}, {
    timestamps : true
});


const tokenBlacklistModel = mongoose.model('blacklistTokens', blackListTokenSchema);

module.exports = tokenBlacklistModel
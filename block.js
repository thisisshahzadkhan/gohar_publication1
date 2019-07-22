
var mongoose = require('mongoose');

var blockSchema = new mongoose.Schema({
    perviousHash: String,
    deligator:String,
    deligatee:String,
    deviceId:String,
    validTill:String,
    hash:String,
    timestamp:String,
});

module.exports = mongoose.model('block',blockSchema);

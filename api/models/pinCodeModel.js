var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pinCodeSchema = {
    pin: Number,
    email: String,
    timeout:{
        type: Date,
        default: Date.now
    }
};

module.exports = mongoose.model('PinCode', pinCodeSchema);
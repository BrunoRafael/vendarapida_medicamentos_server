var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var notificationSchema = {
    type: String,
    visualized : {
        type: Boolean,
        default: false
    },
    info: Schema.Types.Mixed,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
};

module.exports = mongoose.model('Notification', notificationSchema);
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var conversationSchema = {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    estab: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment'
    },
    messages: [{
        text: String,
        date: {
            type: Date,
            default: Date.now
        },
        whoSent: {
            type: Schema.Types.ObjectId,
        }
    }]
};

module.exports = mongoose.model('Conversation', conversationSchema);
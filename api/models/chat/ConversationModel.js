var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConversationSchema = {
    estab: {
        type: Schema.Types.ObjectId,
        ref: 'Establishment'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
};

module.exports = mongoose.model('Conversation', ConversationSchema);
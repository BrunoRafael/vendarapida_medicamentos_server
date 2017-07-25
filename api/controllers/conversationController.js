var config = require('../../config/config'),
    Conversation = require('../models/conversationModel.js'),
    utils = require('../../Utils.js');

exports.saveMessage = (user, estab, text, date, whoSent, result) => {

    var conditions = {
        user: user,
        estab: estab
    };

    var update = {
        '$addToSet': {
            messages: [{
                text: text,
                date: date,
                whoSent: whoSent
            }]
        }
    };

    var options = {
        upsert: true
    };

    Conversation.findOneAndUpdate(
        conditions,
        update,
        options,
        (err, conversation) => {
            if (err) {
                result({
                    "content": {
                        "success": false,
                        "data": err
                    }
                });
            } else {
                result({
                    "content": {
                        "success": true,
                        "data": conversation
                    }
                });
            }
        }
    );
};

exports.getConversation = (estab, user, result) => {

    console.log("Estab: ", estab);
    console.log("User: ", user);

    Conversation.findOne({
        estab: estab,
        user: user
    }, (err, conv) => {

        console.log("Conversation: ", conv);

        if (err) {
            result({
                "content": {
                    "success": false,
                    "data": err
                }
            });
        } else {
            result({
                "content": {
                    "success": true,
                    "data": conv
                }
            });
        }
    });
};

exports.getConversationById = (id, result) => {

    Conversation.findById(id, (err, conv) => {

        console.log("Conversation: ", conv);

        if (err) {
            result({
                "content": {
                    "success": false,
                    "data": err
                }
            });
        } else {
            result({
                "content": {
                    "success": true,
                    "data": conv
                }
            });
        }
    });
};
/**
 * Created by Bruno Rafal on 26/07/2016.
 */
var mongoose = require('mongoose'),
    Hint = require('../models/HintModel.js'),
    NotificationController = require('./notificationController.js'),
    UserController = require('./UserController.js'),
    WebSocket = require('../resources/web_socket/WebSocket.js');

exports.save = function (title, text, imgUrl, establishmentId, callback) {
    var newHint = {title: title, imgUrl: imgUrl, text: text, establishment: establishmentId};
    var hint = new Hint(newHint);
    hint.save({new:true},function(err, savedHint){
        if(!err){
            Hint.populate(savedHint, { path: 'establishment' }, function (error, populateHint) {
                if(!error){
                    callback({
                        content: {
                            data: populateHint,
                            success: true
                        }
                    });
                    saveAndNotifyAllUsers(populateHint);
                } else {
                    callback({
                        content: {
                            data: error,
                            success: false
                        }
                    });
                }
            });
        } else {
            callback({
                content: {
                    data: err,
                    success: false
                }
            });
        }

    });
};

function saveAndNotifyAllUsers(hint){
    UserController.find({},function(result){
        var users = result.content.data;
        users.forEach(function(user){
            var type = "hint";
            NotificationController.save(type, hint, user._id, function(response){
                WebSocket.notification(user._id, response.content.data);
            });
        });
    });
}
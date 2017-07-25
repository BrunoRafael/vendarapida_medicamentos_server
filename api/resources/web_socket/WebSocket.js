/**
 * Created by Bruno Rafael on 12/09/2015.
 */
var socket_io = require("socket.io");
var io = socket_io();
var promotionController = require('../../controllers/PromotionController.js');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var config = require('../../../config/config');
var mongoose = require('mongoose');
//var Conversation = require('../../models/conversationModel.js');

const CONNECTION = 'connection',
    UNAUTHORIZED = 'unauthorized',
    AUTHENTICATED = 'authenticated',
    DISCONNECT = 'disconnect',
    ERROR = 'error',
    NOTIFICATION_ADDED = 'notificationAdded',
    UPDATE_LIKES = 'updateLikes',
    ADD_LIKE = 'addLike',
    REMOVE_LIKE = 'removeLike',
    LIKE_SUCCESS = 'likeSuccess',
    ADD_COMMENT = 'addComment',
    REMOVE_COMMENT = 'removeComment',
    UPDATE_COMMENT = 'updateComment',
    ADDED_COMMENT = 'newCommentAdded',
    REMOVED_COMMENT = 'commentRemoved',
    UPDATED_COMMENT = 'updatedComment',
    RESPONSE_SUFIX = 'Response',
    UPDATE_ESTABLISHMENT_RANK = 'updateEstablishmentRank';
    
var sockets = {};
    
io.on(CONNECTION, function (socket) {

    console.log('connected');
    
    jwt.verify(socket.handshake.query.token, config.secret, function (err, userInformations) {
        if (err) {

            return socket.disconnect(UNAUTHORIZED);
        }
        
        sockets[userInformations._id.toString()] = socket;

        socket.userInformations = userInformations;
        socket.emit(AUTHENTICATED);

        onEvaluateLikesEvent(socket);
        onCommentsEvent(socket);

        socket.on(DISCONNECT, function (json) {
            delete sockets[userInformations._id];
            console.log('Got disconnect!');
        });

        socket.on(ERROR, function (exception) {
            console.log('SOCKET ERROR ' + exception);
        });
    });
});

exports.notification = function (id, notification) {
    if(sockets[id.toString()]){
        sockets[id].emit(NOTIFICATION_ADDED, notification);
    }
};

exports.updateEstablishmentRank = function(establishment){
    io.sockets.emit(UPDATE_ESTABLISHMENT_RANK, establishment);
};

/*Update the likes in the promotion*/
function onEvaluateLikesEvent(socket) {

    function sendBroadcastUpdateLikes(resp) {
        var content = resp.content.data;
        var likes = content.evaluates.user_likes;
        var promotion_id = content._id;
        io.emit(LIKE_SUCCESS, {
            success: resp.content.success,
            promotion_id: promotion_id,
            likes: likes.length
        });
        if (resp.content.success) {
            socket.broadcast.emit(UPDATE_LIKES, {
                success: resp.content.success,
                promotion_id: promotion_id,
                likes: likes.length
            });
        }
    }

    socket.on(ADD_LIKE, function (req) {
        var params = {
            promotion_id: validator.trim(validator.escape(req.promotion_id)),
            user_informations: socket.userInformations
        };
        promotionController.addLike(params, sendBroadcastUpdateLikes, function (exception) { });
    });

    socket.on(REMOVE_LIKE, function (req) {
        var params = {
            promotion_id: validator.trim(validator.escape(req.promotion_id)),
            user_informations: socket.userInformations
        };
        promotionController.removeLike(params, sendBroadcastUpdateLikes, function (exception) { });

    });
}

function onCommentsEvent(socket) {

    /*function sendBroadcastUpdateComments(eventName, resp){
        var content = resp.content.data;
        if(resp.content.success) {
            io.emit(eventName + RESPONSE, {success: resp.content.success, comment: resp.content.data});
            socket.broadcast.emit(eventName, {success: resp.content.success, });
        } else {
            io.emit(ERROR, {success: resp.content.success, error: content.error});
            socket.broadcast.emit(ERROR, {success: resp.content.success, error: content.error});
        }
    }*/

    socket.on(ADD_COMMENT, function (req) {
        promotionController.addComment(req.comment,
            function (response) {
                var listenerId = ADD_COMMENT + RESPONSE_SUFIX + socket.userInformations._id;
                io.emit(listenerId, response.content);
                if (response.content.success) {
                    listenerId = ADDED_COMMENT + response.content.data._promotion._id;
                    socket.broadcast.emit(listenerId, response.content);
                }
            }
        );
    });

    socket.on(REMOVE_COMMENT, function (req) {
        var comment_id = req.comment_id;
        var promotion_id = req.promotion_id;
        promotionController.removeComment(comment_id,
            function (response) {
                var listenerId = REMOVE_COMMENT + RESPONSE_SUFIX + comment_id;
                io.emit(listenerId, response.content);
                if (response.content.success) {
                    listenerId = REMOVED_COMMENT + promotion_id;
                    socket.broadcast.emit(listenerId, response.content);
                }
            },
            function (exception) {
                socket.broadcast.emit(ERROR, {
                    error: exception
                });
            }
        );
    });

    socket.on(UPDATE_COMMENT, function (req) {
        var newText = req.newText;
        var comment_id = req.comment_id;
        var promotion_id = req.promotion_id;
        promotionController.updateComment(comment_id, newText,
            function (response) {
                var listenerId = UPDATE_COMMENT + promotion_id;
                io.emit(listenerId, response.content);
                if (response.content.success) {
                    listenerId = UPDATED_COMMENT + promotion_id;
                    socket.broadcast.emit(listenerId, response.content);
                }
            },
            function (exception) {
                socket.broadcast.emit(ERROR, {
                    error: exception
                });
            }
        );
    });
}

exports.io = io;

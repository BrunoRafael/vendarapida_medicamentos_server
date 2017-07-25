var mongoose = require('mongoose'),
    Notification = require('../models/notificationModel.js'),
    Establishment = require('../models/EstablishmentModel.js');

exports.save = function (type, info, user, result) {

    new Notification({
        'type': type,
        'info': info,
        'user': mongoose.Types.ObjectId(user)
    }).save(function (error, notification) {
        if (error) {
            result({
                "content": {
                    "success": false,
                    "data": error
                }
            });
        } else {
            result({
                "content": {
                    "success": true,
                    "data": notification
                }
            });
        }
    });
};

exports.delete = function (id, result) {

    Notification.findById(id, (error, notification) => {
        if (error) {
            result({
                content: {
                    success: false,
                    data: error
                }
            });
        } else {
            notification.remove((error) => {
                if (!error) {
                    result({
                        content: {
                            success: true,
                            data: notification
                        }
                    });
                } else {
                    result({
                        content: {
                            success: false,
                            data: error
                        }
                    });
                }
            });
        }
    });
};

exports.loadOld = function (skip, limit, user_id, result) {
    Notification.find({user: mongoose.Types.ObjectId(user_id)}).
    populate([{path: 'info._company', model: Establishment},{path: 'info.establishment', model: Establishment}]).
    sort({_id : -1}).
    skip(skip).
    limit(limit).
    exec((error, notifications) => {
            if (error) {
                result({
                    content: {
                        success: false,
                        data: error
                    }
                });
            } else {
                result({
                    content: {
                        success: false,
                        data: notifications
                    }
                });
            }
    });
};

exports.getCountNotVisualized = function(userId, response){
  Notification.find({user: userId, visualized: false}).
  count().
  exec(function(error, count){
      if(!error){
          response({
              content: {
                  success: true,
                  data: count
              }
          })
      } else {

      }
  })
};

exports.visualizePromotion = function(ids, response){
    var objectIds = [];
    var conditions;

    for(var i = 0; i < ids.length; i++){
       objectIds.push(mongoose.Types.ObjectId(ids[i]));
    }

    if(objectIds.length == 0){
        conditions = { visualized: false };
    } else {
        conditions = {  _id: { $in: objectIds  }};
    }

    Notification.update(conditions, { $set: { visualized: true }}, { new: true, multi: true}).
    exec(function(error, result){
        if(!error){
            response({
                content: {
                    success: true,
                    data: result
                }
            })
        } else {
            response({
                content: {
                    success: false,
                    data: error
                }
            })
        }
    })
};


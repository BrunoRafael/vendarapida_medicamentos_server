var Favorite = require('../models/favoriteModel.js'),
    mongoose = require('mongoose'),
    Promotion = require('../models/promotionModel.js');

exports.save = function (promotionId, user, callback) {
    Promotion.findOneAndUpdate(
        { _id: promotionId },
        { $push: { 'mark_as_favorite': mongoose.Types.ObjectId(user) } },
        { new: true },

        function (err, promotion) {
            var conditions = {
                name: promotion.productType
            };
            var update = {
                '$addToSet': {
                    users: user
                }
            };
            var options = {
                upsert: true,
                new: true
            };
            Favorite.findOneAndUpdate(conditions, update, options, function (err, favorite) {
                if (err) {
                    callback({
                        "content": {
                            "success": false,
                            "data": err
                        }
                    });
                } else {
                    callback({
                        "content": {
                            "success": true,
                            "data": favorite
                        }
                    });
                }
            });
        }
    );
};

exports.getUsersByFavorite = function (name, result) {

    Favorite.findOne({ name: name }).
    populate('users').
    exec(function (err, favorite) {

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
                    "data": favorite
                }
            });
        }
    });
};

exports.remove = function (promotionId, user_id, result) {

    Promotion.findOneAndUpdate({ _id: promotionId }, { $pull: { mark_as_favorite: mongoose.Types.ObjectId(user_id) } }, { new: true },
        function (err, promotion) {
            Favorite.findOneAndUpdate({ name: promotion.productType }, { $pull: { users: mongoose.Types.ObjectId(user_id) } }, { new: true },
                function(error){
                    if (err) {
                        result({
                            content: {
                                success: false,
                                data: err
                            }
                        });
                    } else {
                        if (err) {
                            result({
                                content: {
                                    success: false,
                                    data: error
                                }
                            });
                        } else {
                            result({
                                content: {
                                    success: true,
                                    data: promotion
                                }
                            });
                        }
                    }

                }
            );
        }

    );
};
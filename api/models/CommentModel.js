/**
 * Created by Bruno Rafael on 28/04/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = {
    _user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    _promotion: {
        type: Schema.ObjectId,
        ref: 'Promotion'
    },
    date: Date,
    text: String
};

module.exports = mongoose.model('Comment', CommentSchema);
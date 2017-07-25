/**
 * Created by Bruno Rafal on 26/07/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    Establishment = require('./EstablishmentModel.js');

var hintSchema = {
    title: String,
    imgUrl: String,
    text: String,
    establishment: {
        type: Schema.ObjectId,
        ref: 'Establishment'
    }
};

module.exports = mongoose.model('Hint', hintSchema);
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var favoriteSchema = {
    name: String,
    users: [{
        type: Schema.ObjectId,
        ref: 'User'
    }]
};

module.exports = mongoose.model('Favorite', favoriteSchema);
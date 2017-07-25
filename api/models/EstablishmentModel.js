var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var establishmentSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    cnpj: {
        type : String,
        required: true,
        unique: true
    },
    phones:{
        type: [String],
        required: true
    },
    likes: {
        type : Number,
        default: 0
    },
    totalOfPublications: {
        type : Number,
        default: 0
    },
    rank: {
        type : String,
        default: "Bronze"
    },
    address: {
        street: {
            type: String,
            required: true
        },
        neighborhood: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        cep: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        uf: {
            type: String,
            required: true
        }
    }
});

/*Antes de salvar o estabelecimento, usa criptografia na sua senha*/
establishmentSchema.pre('save', function (next) {

    var establishment = this;

    bcrypt.genSalt(5, function (err, salt) {

        if (err) return next(err);

        bcrypt.hash(establishment.password, salt, null, function (err, hash) {

            if (err) return next(err);

            establishment.password = hash;

            next();

        });
    });
});

establishmentSchema.methods.passwordVerification = function (password, next) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return next(err);
        next(isMatch);
    });
};

module.exports = mongoose.model('Establishment', establishmentSchema);

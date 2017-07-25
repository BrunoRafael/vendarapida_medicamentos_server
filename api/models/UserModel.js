var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

/*Esquema dos Usuários*/
var userSchema = new Schema({
  name: {
    type: String,
    required: true
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
  phone: {
    type: String,
    unique: true
  },
  photo: {
    type: String,
    default: 'http://www.exaclair.com/images/placeholders/team-placeholder.jpg'
  },
  settings: {
    language: {
      type: String,
      default: 'pt-br'
    },
    removeFinishPromotions : {
      type: Boolean,
      default: false
    },
    vibration:{
      type: Boolean,
      default: true
    }
  }
});

/*Antes de salvar o usuário, usa criptografia na sua senha*/
userSchema.pre('save', function(next) {

  var user = this;

  bcrypt.genSalt(5, function(err, salt) {

    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {

      if (err) return next(err);

      user.password = hash;

      next();

    });
  });
});

userSchema.methods.passwordVerification = function(password, next) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return next(err);
    next(isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
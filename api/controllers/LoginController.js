var jwt = require('jsonwebtoken'),
  config = require('../../config/config'),
  User = require('../models/UserModel.js');
Establishment = require('../models/EstablishmentModel.js');
var mongoose = require('mongoose');

exports.login = function (email, password, callback) {
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {

      callback({
        success: false,
        msg: "Erro ao acessar banco de dados"
      });

    } else if (!user) {

      callback({
        success: false,
        msg: 'Usuário não encontrado!'
      });

    } else if (user) {

      user.passwordVerification(password, function (ismatch) {

        if (ismatch) {
          var userInformations = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            _id: user._id,
            settings: user.settings,
            photo: user.photo
          };

          var token = jwt.sign(userInformations, config.secret);

          callback({
            success: true,
            msg: 'Logado com sucesso!',
            token: token,
            userInformations: userInformations
          });

        } else {
          callback({
            success: false,
            msg: 'Senha incorreta!'
          });
        }
      });
    }
  });
};

exports.loginEstablishment = function (email, password, callback) {
  Establishment.findOne({
    email: email
  }, function (err, establishment) {
    if (err) {
      callback({
        success: false,
        msg: "Erro ao acessar banco de dados"
      });

    } else if (!establishment) {
      callback({
        success: false,
        msg: 'Estabelecimento não encontrado!'
      });

    } else if (establishment) {
      establishment.passwordVerification(password, function (ismatch) {
        if (ismatch) {
          delete establishment.password;

          var token = jwt.sign(establishment, config.secret);

          callback({
            success: true,
            msg: 'Logado com sucesso!',
            token: token,
            establishmentInformations: establishment
          });

        } else {
          callback({
            success: false,
            msg: 'Senha incorreta!'
          });
        }
      });
    }
  });
};

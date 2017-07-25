var PinCode = require('../models/pinCodeModel.js');
var mongoose = require('mongoose');

exports.save = (email, pin, result) => {

    new PinCode({
        email: email,
        pin: pin
    }).save((err, pincode) => {
        if (err) {
            result({
                "content": {
                    "success": false,
                    "msg": 'Não foi possível salvar o pinCode',
                    "data": err
                }
            });
        } else {
            result({
                "content": {
                    "success": true,
                    "msg": 'PinCode criado com o sucesso',
                    "data": pincode
                }
            });
        }
    });
};

exports.validatePinCode = (pin, email, result) => {
    
    PinCode.findOne({ pin: pin, email: email }, (err, pinCode) => {
        if (err) {
            result({
                "content": {
                    "success": false,
                    "msg": 'Não foi possível encontrar o pinCode',
                    "data": err
                }
            });
        } else if (!pinCode) {
            result({
                "content": {
                    "success": false,
                    "msg": 'PinCode inválido',
                    "data": pinCode
                }
            });
        } else {
            result({
                "content": {
                    "success": true,
                    "msg": 'PinCode é Válido',
                    "data": pinCode
                }
            });
        }
    });
};


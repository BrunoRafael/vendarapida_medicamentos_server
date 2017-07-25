var express = require('express');
var router = express.Router();

var validator = require('validator');
var nodemailer = require('nodemailer');

var userController = require('../api/controllers/UserController.js');

var self = this;

var conta = nodemailer.createTransport({
    service: 'Gmail', // Existem outros services, você pode procurar
    // na documentação do nodemailer como utilizar
    // os outros serviços
    auth: {
        user: 'isnottrash@gmail.com', // Seu usuário no Gmail
        pass: '123.developer' // A senha da sua conta no Gmail :-)
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Is Not Trash App <isnottrash@gmail.com>', // sender address
    to: 'ygor.rodolfo.santos@ccc.ufcg.edu.br', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello My Friend! 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

router.post('/', function(req, res) {
    var selectedUser;
    var email = validator.trim(validator.escape(req.body.email));

    userController.findUserByEmail(email,
        function(user) {
            selectedUser = user[0];
            if (selectedUser === undefined) {
                res.send({
                    error: 'Email não cadastrado.'
                });
            } else {
                self.sendEmail(selectedUser, res);
            }
        },
        function(error) {
            res.send(error, 500);
        });
});

this.sendEmail = function(selectedUser, res) {
    mailOptions.to = selectedUser.email;
    mailOptions.subject = "Recuperação de Senha ✔";
    mailOptions.html = "Olá " + selectedUser.nome + ". A sua senha é: " + selectedUser.senha;
    // send mail with defined transport object
    res.send(conta.sendMail(mailOptions, function(error, info) {
        if (error) {
            return error;
        } else {
            return 'Message sent: ' + info.response;
        }
    }));
};

module.exports = router;
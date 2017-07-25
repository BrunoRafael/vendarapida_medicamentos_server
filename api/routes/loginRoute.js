var express = require('express');
var validator = require('validator');
var userController = require('../controllers/UserController.js');
var establishmentController = require('../controllers/EstablishmentController.js');
var router = express.Router();
var loginController = require('../controllers/LoginController.js');

router.post('/', function(req, res){

	var email = req.body.email;
	var password =  req.body.password;

	loginController.login(email, password, function(resp){
		res.json(resp);
	});
});

router.post('/establishment', function(req, res){

	var email = req.body.email;
	var password =  req.body.password;

	loginController.loginEstablishment(email, password, function(resp){
		res.json(resp);
	});
});

/*Rota que cria um usuário*/
router.post('/create/user', function(req, res) {

	var name = validator.trim(validator.escape(req.body.name));
	var email = validator.trim(validator.escape(req.body.email));
	var password = validator.trim(validator.escape(req.body.password));
	var phone = validator.trim(validator.escape(req.body.phone));

	userController.save(name, email, password, phone, function(resp) {
		res.status(200).send(resp);
	}, function(exception) {
		res.status(exception.code).send(exception.error);
	});
});

/*Rota que cria um estabelecimento*/
router.post('/create/establishment', function(req, res) {
	var establishment = req.body;

	establishmentController.create(establishment, function(resp) {
		res.status(200).send(resp);
	}, function(exception) {
		console.log(exception.error);
		res.status(exception.code).send(exception.error);
	});
});

module.exports = router;
var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController.js');
var validator = require('validator');
var url = require('url');

/*Rota que retorna o usuário específico ou todos os usuários */
router.get('/', function(req, res) {

    var query = req.query;
    
    userController.user(query,
        function(resp) {
            res.status(200).send(resp);
        },
        function(exception) {
            res.status(404).send(exception);
        }
    );
});

/*Rota que atualiza um usuário*/
router.put('/language', function(req, res) {

    var id = validator.trim(validator.escape(req.body._id));
    var language = validator.trim(validator.escape(req.body.language));

    userController.updateLanguage(id, language,
        function(resp) {
            res.status(200).send(resp);
        },
        function(exception) {
            res.status(400).send(exception);
        }
    );
});

/*Rota que atualiza o nome de um usuário*/
router.put('/name', function(req, res) {

    var id = validator.trim(validator.escape(req.body._id));
    var name = validator.trim(validator.escape(req.body.name));

    userController.updateName(id, name,
        function(resp) {
            res.status(200).send(resp);
        },
        function(exception) {
            res.status(400).send(exception);
        }
    );
});

/*Rota que atualiza o email de um usuário*/
router.put('/email', function(req, res) {

    var id = validator.trim(validator.escape(req.body._id));
    var email = validator.trim(validator.escape(req.body.email));

    userController.updateEmail(id, email,
        function(resp) {
            res.status(200).send(resp);
        },
        function(exception) {
            res.status(400).send(exception);
        }
    );
});

/*Rota que atualiza o phone de um usuário*/
router.put('/phone', function(req, res) {

    var id = validator.trim(validator.escape(req.body._id));
    var phone = validator.trim(validator.escape(req.body.phone));

    userController.updatePhone(id, phone,
        function(resp) {
            res.status(200).send(resp);
        },
        function(exception) {
            res.status(400).send(exception);
        }
    );
});

/*Rota que atualiza o password de um usuário*/
router.put('/password', function(req, res) {

    var id = validator.trim(validator.escape(req.body._id));
    var password = validator.trim(validator.escape(req.body.password));
    var newPassword = validator.trim(validator.escape(req.body.newPassword));
    
    userController.setPassword(id, password, newPassword,
        function(resp) {
            res.status(200).send(resp);
        },
        function(exception) {
            res.status(400).send(exception);
        }
    );
});

/*Rota que atualiza a foto de um usuário*/
router.put('/photo', function(req, res) {

    var id = validator.trim(validator.escape(req.body._id));
    var photo = validator.trim(validator.escape(req.body.photo));
    
    userController.updatePhoto(id, photo,
        function(resp) {
            res.status(200).send(resp);
        },
        function(exception) {
            res.status(400).send(exception);
        }
    );
});

/*Rota que retorna as promoções não finalizadas*/
router.put('/finalized/promotions', function(req, res) {

    var removeFinishPromotions = req.body.removeFinishPromotions;

    userController.updateFinalizedPromotions(req.userInformations._id, removeFinishPromotions,
        //returns promotions - finalized promotions
        function(resp) {
            res.status(200).send(resp.content.data);
        },
        function(exception) {
            res.status(400).send(exception);
        }
    );
});
/*Rota que retorna as promoções não finalizadas*/
router.put('/vibration', function(req, res) {

    var vibration = req.body.vibration;

    userController.updateVibrationSettings(req.userInformations._id, vibration,
        //returns promotions - finalized promotions
        function(resp) {
            res.status(200).send(resp.content.data);
        },
        function(exception) {
            res.status(400).send(exception);
        }
    );
});


/*Rota que deleta um usuário*/
router.delete('/:id', function(req, res) {
    var json = url.parse(req.url, true).query;

    var id = validator.trim(validator.escape(json.id));
    userController.delete(id, function(resp) {
        res.status(200).send(resp);
    }, function(exception) {
        res.status(404).send(404);
    });
});

module.exports = router;

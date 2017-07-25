'use strict';

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var PromotionController = require('../controllers/PromotionController.js');
var GeneratorManager = require('../resources/generator/GeneratorManager.js');
var validator = require('validator');

var io = require('../resources/web_socket/WebSocket.js');

const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 10;

/*Implementa método POST para recuperar todas as promoções*/
router.post('/', function(req, res){
    var user_id = req.userInformations._id;

    PromotionController.all(user_id,
        function(result) {
            res.json(result);
        }, function(exception){}
    );
});

/*Implementa método GET para recuperar todas as promoções*/
router.get('/search/name', function(req, res){
    var id = req.userInformations._id;
    var name = req.query.name;

    console.log("Routers", name);

    PromotionController.searchByName(name, id,
        function(result) {
            res.json(result.content);
        }
    );
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página.*/
router.post('/oldPromotions', function(req, res){

    var skip = parseInt(validator.trim(validator.escape(req.body.skip)));
    var limit = parseInt(validator.trim(validator.escape(req.body.limit)));
    var user_id = validator.trim(validator.escape(req.userInformations._id));
    var removeFinalizedPromotions = req.body.removeFinalizedPromotions;
    var establishmentId = validator.trim(validator.escape(req.body.establishmentId));

    PromotionController.listByPage(skip, limit, user_id, removeFinalizedPromotions, establishmentId,
        function(promotions) {
            res.json(promotions);
        }, function(exception){
            console.log(exception);
        }
    );
});

/*Implementa serviço de requisição de produtos por página e por tamanho de página. Fazer acontecer com webScoket*/
router.post('/newPromotions', function(req, res){
    var lastPromotionAddedId = req.body.lastPromotionAddedId;
    var id = validator.trim(validator.escape(req.userInformations._id));
    var limit = parseInt(validator.trim(validator.escape(req.body.limit)));
    var removeFinalizedPromotions = req.body.removeFinalizedPromotions;
    var establishmentId = validator.trim(validator.escape(req.body.establishmentId));

    if(!lastPromotionAddedId){
        PromotionController.all(id, removeFinalizedPromotions,
            function(result) {
                res.json(result);
            }, function(exception){
                console.log(exception);
            }
        );
    } else {
        PromotionController.listNewPromotions(lastPromotionAddedId, limit, removeFinalizedPromotions, establishmentId,
            function(result) {
                res.json(result);
            }, function(exception){
                console.log(exception);
            }
        );
    }
});

router.post('/addPromotion', function(req, res){
    var promotion = req.body.promotion;
    addPromotion(promotion, res);
});

function addPromotion(promotion, res){
    PromotionController.addPromotion(promotion,
        function(result){
            //res.json(result.content);
            console.log('promoção enviada!');
        }, function(exception){
            //res.status(400).json(exception);
        }
    );
}

router.post('/oldComments', function(req, res){
    var skip = parseInt(validator.trim(validator.escape(req.body.skip)));
    var limit = parseInt(validator.trim(validator.escape(req.body.limit)));
    var promotion_id = validator.trim(validator.escape(req.body.promotion_id));
    PromotionController.getOldComments(skip, limit, promotion_id,
        function(result){
            res.json(result.content);
        }, function(exception){
            console.log(exception);
        }
    );
});

router.post('/newComments', function(req, res){
    var promotionId = validator.trim(validator.escape(req.body.promotionId));
    var lastCommentId = validator.trim(validator.escape(req.body.lastCommentId));
    var limit = parseInt(validator.trim(validator.escape(req.body.limit)));
    if(!lastCommentId){
        PromotionController.getOldComments(DEFAULT_SKIP, DEFAULT_LIMIT, promotionId,
            function(resp){
                res.json(resp);
            }, function(exception){}
        );
    } else {
        PromotionController.getNewComments(limit, promotionId, lastCommentId,
            function(resp){
                res.json(resp.content.data);
            }
        );
    }
});

router.delete('/:id', function(req, res) {

    var id = req.params.id;

    PromotionController.delete(id, function(resp) {
        res.status(200).send(resp);
    }, function(exception) {
        res.status(404).send(404);
    });
});

router.post('/history', function(req, res) {

    var productType = req.body.productType;
    var skip = req.body.skip;
    var limit = req.body.limit;

    PromotionController.promotionByTypes(productType, skip, limit, function(resp) {
        res.status(200).send(resp.content.data);
    }, function(exception) {
        res.status(404).send(404);
    });
});

/*function addAutomaticPromotions(){
    setInterval(function(){
        Establishment.find({}, function(err, documents) {
            var promotion = GeneratorManager.generatePromotion();
            if(!promotion.images[0]){
                return;
            }
            var i = Math.floor(Math.random() * documents.length);
            promotion._company = documents[i]._id;
            addPromotion(promotion);

        });
    }, 90000);

}

addAutomaticPromotions();*/

module.exports = router;

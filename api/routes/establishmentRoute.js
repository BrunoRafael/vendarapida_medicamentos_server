var express = require('express'),
  router = express.Router(),
  establishmentController = require('../controllers/EstablishmentController.js'),
  validator = require('validator');

router.get('/', (req, res) => {
  var id = req.query.id;

  console.log("ID ESTABELECIMENTO: ", id);

  establishmentController.getEstablishment(id, (resp) => {
    establishmentController.rank(id, function (response) {
        resp.content.data[0].rank = response;
        res.json(resp.content);
    });
  });
});

router.get('/search/name', (req, res) => {
  var name = req.query.name;
  if(!name){
    establishmentController.all((resp) => {
      res.json(resp.content);
    });
  }else{
    establishmentController.searchByName(name, (resp) => {
      res.json(resp.content);
    });
  }
});

router.get('/search/city', (req, res) => {
  var city = req.query.city;

  establishmentController.byCity(city, (resp) => {
    res.json(resp.content);
  });
});

router.post('/', function(req, res) {

  var name = req.body.name;
  var city = req.body.city;

  establishmentController.create(name, city, (resp) => {
    res.json(resp.content);
  });
});

/*Implementa serviço de requisição de produtos de um determinado estabelecimento. Fazer acontecer com webScoket*/
router.post('/promotions', function(req, res){

  var establishmentId = validator.trim(validator.escape(req.body.establishmentId));
  establishmentController.establishmentPromotions(establishmentId,
      function(resp) {
        res.json(resp);
      }, function(exception){}
  );
});

/*Implementa serviço de requisição de produtos ordenados de um determinado estabelecimento. Fazer acontecer com webScoket*/
router.post('/beginPromotions', function(req, res){

  var establishment = validator.trim(validator.escape(req.body.establishment));

  establishmentController.establishmentBeginPromotions(establishment,
      function(resp) {
        res.json(resp);
      }, function(exception){}
  );
});

router.delete('/:id', function(req, res) {

    var id = req.params.id;

    establishmentController.delete(id, function(resp) {
        res.status(200).send(resp);
    }, function(exception) {
        res.status(404).send(404);
    });
});

module.exports = router;

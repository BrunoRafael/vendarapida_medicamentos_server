var express = require('express'),
    router = express.Router(),
    favoriteController = require('../controllers/favoriteController.js');

router.post('/', function (req, res) {
    var promotionId = req.body.promotionId;
    console.log(req.userInformations);
    var user = req.userInformations._id;

    favoriteController.save(promotionId, user, function (resp) {
        res.json(resp.content);
    })
});

router.delete('/', function(req, res){
    var promotionId = req.query.promotionId;
    var user = req.userInformations._id;
    favoriteController.remove(promotionId, user, function (resp) {
        res.json(resp.content);
    });
});

router.get('/:name', function (req, res) {
    
    var name = req.params.name;

    favoriteController.getUsersByFavorite(name, function (resp) {
        res.json(resp.content);
    })
});


module.exports = router;
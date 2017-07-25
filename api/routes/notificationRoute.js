var express = require('express'),
    router = express.Router(),
    notificationController = require('../controllers/notificationController.js');

router.post('/', function (req, res) {
    
    console.log("ADD NOTIFICATION");
    
    var type = req.body.type;
    var info = req.body.info;
    var user = req.body.user;

    notificationController.save(type, info, user, function (resp) {
        res.json(resp.content);
    });
});

router.delete('/', function (req, res) {
    
    notificationController.delete(id, function (resp) {
        res.json(resp.content);
    });
});

router.post('/old', function (req, res) {
    var skip = parseInt(req.body.skip);
    var limit = parseInt(req.body.limit);
    var userId = req.userInformations._id;
    notificationController.loadOld(skip, limit, userId, function (resp) {
        res.json(resp.content);
    });
});

router.post('/visualized/count', function(req, res){
    var userId = req.userInformations._id;
    notificationController.getCountNotVisualized(userId, function (resp) {
        res.json(resp.content);
    });
});

router.put('/visualize/all', function(req, res){
    notificationController.visualizePromotion(req.body.ids, function (resp) {
        res.json(resp.content);
    });
});

module.exports = router;
/**
 * Created by Bruno Rafal on 26/07/2016.
 */
var express = require('express'),
    router = express.Router(),
    GeneratorManager = require('../resources/generator/GeneratorManager.js'),
    HintController = require('../controllers/HintController.js');

router.post('/', function(req, res){
    var title = req.body.title;
    var imgUrl = req.body.imgUrl;
    var text = req.body.text;
    var establishmentId = req.body.establishmentId;

    HintController.save(title, text, imgUrl, establishmentId, function(response){
        if(response.content.success) {
            res.json(response.content.data);
        }
    })
});
/*function addAutomaticHint() {
    setInterval(function () {
        var hint = GeneratorManager.generateHint();
        Establishment.find({}, function(err, documents) {
            var i = Math.floor(Math.random() * documents.length);
            HintController.save(hint.title, hint.text, hint.imgUrl, documents[i]._id,
                function(response){
                    if(response.content.success){
                        console.log("Hint saved!");
                    }
                }
            );
        });
    }, 3600000)
}
addAutomaticHint();*/

module.exports = router;
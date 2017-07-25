var express = require('express');
var router = express.Router();
var recoverPasswordController = require('../controllers/recoverPasswordController.js');

router.post('/', (req, res) =>{
    
    var email = req.body.email;
    
    recoverPasswordController.sendEmail(email);
    res.end();
    
});

module.exports = router;
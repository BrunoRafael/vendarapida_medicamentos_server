var express = require('express');
var router = express.Router();
var pinCode = require('../controllers/pinCodeController.js');

router.post('/', (req, res) => {

    var email = req.body.email;
    var pin = req.body.pinCode;

    pinCode.validatePinCode(pin, email, (result) => {
        if (result.content.success) {
            res.json(result);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
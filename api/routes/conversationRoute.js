var express = require('express'),
	router = express.Router(),
	conversationController = require('../controllers/conversationController.js');


router.post('/', (req, res) => {
	var estab = req.body.estab;
	var user = req.body.user;
	var text = req.body.text;
	var whoSent = req.body.whoSent;

	conversationController.saveMessage(estab, user, text, new Date(), whoSent,
		(result) => {
			res.status(200).send(result.content);
		}
	);
});

router.get('/', (req, res) => {

	var estab = req.query.estab;
	var user = req.query.user;

	conversationController.getConversation(estab, user,
		(result) => {
			res.status(200).send(result.content);
		}
	);
});

router.get('/byId', (req, res) => {

	var id = req.query.id;

	conversationController.getConversationById(id,
		(result) => {
			res.status(200).send(result.content);
		}
	);
});


module.exports = router;
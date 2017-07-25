var jwt = require('jsonwebtoken'),
	config = require('./config/config');

function auth(req, res, next) {

	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, config.secret, (err, userInformations) => {
			if (err) {
				return res.json({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
			console.log("UI " + userInformations);
				req.userInformations = userInformations;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
}

module.exports = auth;
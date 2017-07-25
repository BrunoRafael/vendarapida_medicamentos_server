var app = require('./config/app_config.js'),
	promotionRouter = require('./api/routes/promotionRoute.js'),
	hintRouter = require('./api/routes/hintRoute.js'),
	usersRouter = require('./api/routes/userRoute.js'),
	loginRouter = require('./api/routes/loginRoute.js'),
	establishmentRouter = require('./api/routes/establishmentRoute.js'),
	notificationRouter = require('./api/routes/notificationRoute.js'),
	favoriteRouter = require('./api/routes/favoriteRoute.js'),
	pinCodeRouter = require('./api/routes/pinCodeRoute.js'),
	recoverPasswordRouter = require('./api/routes/recoverPasswordRoute.js'),
	db = require('./config/db_config.js'),
	scriptSendEmail = require('./script/sendEmail.js'),
	express = require('express');

app.get('/', function (request, response) {
	response.send("Servidor no ar");
});

/*Rotas sem autenticação*/
app.use('/api/login', loginRouter);
app.use('/api/recoverPassword', recoverPasswordRouter);
app.use('/api/pinCode', pinCodeRouter);
/*Rotas com autenticação*/
app.use(require('./auth'));
app.use('/api/users', usersRouter);
app.use('/api/promotions', promotionRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/favorite', favoriteRouter);
app.use('/api/establishments', establishmentRouter);
app.use('/api/sendEmail', scriptSendEmail);
app.use('/api/hints', hintRouter);

exports = module.exports = app;

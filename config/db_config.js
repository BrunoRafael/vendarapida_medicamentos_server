var config = require("./config");
var mongoose = require('mongoose');
//var InsertDataInDb = require('../script/insertDataInDB.js');
var url_conn = '';

//var restartDb = true;

if (process.env.PORT) {
	mongoose.connect(config.mongo_uri.heroku);
} else if (process.env.NODE_ENV == 'test') {
	mongoose.connect(config.mongo_uri.test);
} else {
	mongoose.connect(config.mongo_uri.dev);
}

var db = mongoose.connection;

//InsertDataInDb.startDataBase();

db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados'));
db.once('open', console.error.bind(console, 'Conexao com banco de dados aberta com: ' + url_conn));
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Notification = require("../api/models/notificationModel");
var User = require("../api/models/UserModel");
var LoginController = require("../api/controllers/loginController");

chai.use(chaiHttp);

var token = "";
var config = require('../config/config');

describe("Notification", function () {

    Notification.collection.drop();
    User.collection.drop();

    beforeEach(function (done) {
        var user = new User({
            'name': "Example",
            'email': "example@mail.com",
            'password': "123456",
            'phone': "9999-9999"
        });
        user.save(function (err) {
            LoginController.login("example@mail.com", "123456", function (resp) {
                token = resp.token;
                done();
            });
        });
    });

    afterEach(function (done) {
        User.collection.drop();
        Notification.collection.drop();
        done();
    });

    it("Criar notificação com dados válidos", function (done) {

        jwt.verify(token, config.secret, (err, userInformations) => {
            var notification = {
                'type': "Batata",
                'visualized': false,
                'info': {},
                'user': userInformations._id
            };
            notification.token = token;
            chai.request(server)
                .post("/api/notification")
                .send(notification)
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.success.should.equal(true);
                    res.body.data.user.should.equal(userInformations._id);
                    done();
                });
        });
    });
}); 
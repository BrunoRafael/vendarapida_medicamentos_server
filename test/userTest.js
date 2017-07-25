process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var User = require("../api/models/UserModel");

chai.use(chaiHttp);

describe("User", function () {

    User.collection.drop();

    beforeEach(function (done) {
        var user = new User({
            'name': "Example",
            'email': "example@mail.com",
            'password': "123456",
            'phone': "9999-9999"
        });
        user.save(function (err) {
            done();
        });
    });

    afterEach(function (done) {
        User.collection.drop();
        done();
    });

    it("Criar usuário com dados válidos", function (done) {

        var user = {
            'name': "Diego",
            'email': "diego@mail.com",
            'password': "123456",
            'phone': "9941-85698"
        }

        chai.request(server)
            .post("/api/login/create/user")
            .send(user)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.should.have.property('user');
                done();
            });
    });
}); 
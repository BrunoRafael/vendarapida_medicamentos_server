process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var User = require("../api/models/UserModel");

chai.use(chaiHttp);

describe("Login", function () {

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

    it("Usuário com credenciais válidas", function (done) {
        chai.request(server)
            .post("/api/login")
            .send({ "email": "example@mail.com", "password": "123456" })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            });
    });

    it("Usuário com email inválido", function (done) {
        chai.request(server)
            .post("/api/login")
            .send({ "email": "invalido@mail.com", "password": "123456" })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.equal(false);
                done();
            });
    });
}); 
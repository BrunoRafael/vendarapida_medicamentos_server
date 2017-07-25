var mongoose = require('mongoose'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  should = chai.should(),
  expect = chai.expect,
  assert = require('chai').assert,
  jwt = require('jsonwebtoken'),
  config = require('../../config/config'),
  User = require('../models/UserModel.js'),
  dbURI = config.mongo_uri.test,
  clearDB = require('mocha-mongoose')(dbURI, {
    noClear: true
  });

//Usar request do chai
chai.use(chaiHttp);

describe("Tetes da rota de Login", () => {

  var url = 'http://localhost:1337';

  before(function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  before((done) => {
    var users = [{
      name: 'Ygor Santos',
      email: 'ygor.gsan@gmail.com',
      password: '123456789',
      phone: '986668422'
    }];

    User.create(users, (err, users) => {
      done();
    });
  });

  after(function(done) {
    clearDB(done);
  });

  it("Login con usuario valido", (done) => {
    chai.request(url)
      .post("/login")
      .send({
        "email": "ygor.gsan@gmail.com",
        "password": "123456789"
      })
      .end((err, res) => {
        expect(err).to.not.be.an('error');
        expect(res).to.be.an('object');
        res.body.should.have.property('success');
        res.body.should.have.property('msg');
        res.body.should.have.property('token');
        res.body.should.have.property('userInformations');
        res.body.userInformations.name.should.equal('Ygor Santos');
        res.body.userInformations.phone.should.equal('986668422');
        res.body.userInformations.email.should.equal('ygor.gsan@gmail.com');

        var token_res = res.body.token;

        var userInformations = {
          name: 'Ygor Santos',
          email: 'ygor.gsan@gmail.com',
          phone: '986668422'
        };

        var token = jwt.sign(userInformations, config.secret);

        expect(token).to.equal(token_res);
        done();
      });
  });

  it("Login com usuario invalido", (done) => {
    chai.request(url)
      .post("/login")
      .send({
        "email": "diego.augusto@gmail.com",
        "password": "123456789"
      })
      .end((err, res) => {
        expect(err).to.not.be.an('error');
        expect(res).to.be.an('object');
        res.body.should.have.property('success');
        res.body.should.have.property('msg');
        res.body.msg.should.equal("Usuário não encontrado!");
        done();
      });
  });
});

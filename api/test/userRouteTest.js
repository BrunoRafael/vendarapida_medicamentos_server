var config = require("../../config/config"),
  mongoose = require('mongoose'),
  request = require('supertest'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  should = chai.should(),
  expect = chai.expect,
  app = require('../../app'),
  agent = request.agent(app),
  User = require('../models/UserModel.js'),
  dbURI = config.mongo_uri.test,
  clearDB = require('mocha-mongoose')(dbURI, {
    noClear: true
  });

chai.use(chaiHttp);

describe('Testes das rotas do servidor referente ao usuário:', () => {

  var url = 'http://localhost:1337';

  //Inicia conexao com o Banco de Dados usando mocha-mongoose
  before((done) => {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  describe('GET: ', () => {

    //Cria um usuário antes de cada teste
    beforeEach((done) => {

      var users = [{
          name: 'Ygor Santos',
          email: 'ygor.gsan@gmail.com',
          password: '123456789',
          phone: '986668422'
        },

        {
          name: 'Zezinho Transão',
          email: 'zezinho.pegador@email.com',
          password: '123',
          phone: '999415698'
        },

        {
          name: 'Esquilo Negão',
          email: 'esquilo@email.com',
          password: '321',
          phone: '12345678'
        }
      ];

      User.create(users, (err, users) => {
        done();
      });
    });

    //Apaga o banco depois de cada teste
    afterEach((done) => {
      clearDB(done);
    });

    it('Recupera usuário por qualquer parametro (query)', (done) => {
      agent
        .get('/users')
        .query({
          "email": "ygor.gsan@gmail.com"
        })
        .end((err, res) => {
          expect(err).to.not.be.an('error');
          expect(res).to.be.an('object');
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.to.have.length(1);
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('password');
          res.body[0].should.have.property('email');
          res.body[0].should.have.property('phone');
          done();
        });
    });

    it('Recupera todos os usuário', (done) => {
      chai.request(url)
        .get('/users')
        .end(function(err, res) {
          expect(err).to.not.be.an('error');
          res.should.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.a('array');
          res.body.should.to.have.length(3);
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('password');
          res.body[0].should.have.property('email');
          res.body[0].should.have.property('phone');
          done();
        });
    });
  });

  //Teste das rotas POST de users
  describe('POST: ', () => {

    //Cria um usuário antes de cada teste
    beforeEach((done) => {
      new User({
        name: 'José',
        email: 'jose@email.com',
        password: '123456',
        phone: '123456789'
      }).save((err, user) => {
        done();
      });
    });

    //Apaga o banco depois de cada teste
    afterEach((done) => {
      clearDB(done);
    });

    //Teste para salvar um novo usuário no Banco de Dados
    it('Salvar novo usuário', (done) => {

      User.find({}, (err, users) => {

        expect(err).to.not.be.an('error');
        //Verifica se há apenas um usuário cadastrado no Banco (beforeEach)
        users.should.to.have.length(1);

        chai.request(url)
          .post('/users')
          .send({
            name: 'Diego',
            email: 'diego@email.com',
            password: '1234',
            phone: '+5583999415698'
          })
          .end((err, res) => {
            expect(err).to.not.be.an('error');
            res.should.have.status(200);
            expect(res).to.be.an('object');
            res.body.should.have.property('msg');
            res.body.should.have.property('user');
            res.body.msg.should.have.equal("Usuário salvo com sucesso");
            res.body.user.should.have.property('_id');
            res.body.user.should.have.property('email');
            res.body.user.should.have.property('password');
            res.body.user.name.should.equal('Diego');
            res.body.user.email.should.equal('diego@email.com');
            res.body.user.phone.should.equal('+5583999415698');

            User.find({}, (err, users) => {
              expect(err).to.not.be.an('error');
              users.should.to.have.length(2);
              done();
            });
          });
      });
    });

    it('Não deve salvar usuário com mesmo e-mail', (done) => {

      chai.request(url)
        .post('/users')
        .send({
          name: 'José',
          email: 'jose@email.com',
          password: '123456',
          phone: '123456789'
        })
        .end((err, res) => {
          expect(err).to.be.an('error');
          res.should.have.status(400);
          expect(res).to.be.an('object');
          res.body.should.have.property('error');
          res.body.error.should.have.equal("E-mail já cadastrado. Por favor insira outro e-mail");
          done();
        });
    });
  });

  describe('PUT: ', () => {

    beforeEach((done) => {
      new User({
        name: 'José',
        email: 'jose@email.com',
        password: '123456',
        phone: '123456789'
      }).save((err, user) => {
        done();
      });
    });

    //Apaga o banco depois de cada teste
    afterEach((done) => {
      clearDB(done);
    });

    it("Edita atributos de um usuario", (done) => {
      chai.request(url)
        .put('/users')
        .send({
          name: 'Silva',
          email: 'jose@email.com',
          password: '123456',
          phone: '987654321'
        })
        .end((err, res) => {
          expect(err).to.not.be.an('error');
          res.should.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.have.property('msg');
          res.body.msg.should.equal("Usuário atualziado com sucesso");
          res.body.should.have.property('user');
          res.body.user.should.have.property('_id');
          res.body.user.should.have.property('name');
          res.body.user.should.have.property('email');
          res.body.user.should.have.property('password');
          res.body.user.name.should.equal('Silva');
          res.body.user.email.should.equal('jose@email.com');
          res.body.user.phone.should.equal('987654321');
          done();
        });
    });
  });
});

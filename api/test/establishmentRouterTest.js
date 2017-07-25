var mongoose = require('mongoose'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  should = chai.should(),
  expect = chai.expect,
  assert = require('chai').assert,
  jwt = require('jsonwebtoken'),
  config = require('../../config/config'),
  Establishment = require('../models/EstablishmentModel.js'),
  dbURI = config.mongo_uri.test,
  clearDB = require('mocha-mongoose')(dbURI, {
    noClear: true
  });
